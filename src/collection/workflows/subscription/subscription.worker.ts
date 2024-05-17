import { NativeConnection, Worker } from '@temporalio/worker';
import {
  ChargeSubscriptionActivity,
  SendEndOfSubscriptionEmailActivity,
  SendReminderEmailActivity,
  SendWelcomeEmailActivity,
} from './activities';

import { NestApplicationContext, Reflector } from '@nestjs/core';
import { TEMPORAL_ACTIVITY } from '../../../shared/activity.decorator';

export const subscriptionWorker = async (
  app: NestApplicationContext,
): Promise<void> => {
  const activities = createActivityBindings(app, [
    SendWelcomeEmailActivity,
    SendReminderEmailActivity,
    SendEndOfSubscriptionEmailActivity,
    ChargeSubscriptionActivity,
  ]);

  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // TLS and gRPC metadata configuration goes here.
  });

  // Step 2: Register Workflows and Activities with the Worker.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'default',
    // Workflows are registered using a path as they run in a separate JS context.
    workflowsPath: require.resolve('./subscription.workflow'),
    activities: activities,
    // workflowBundle
  });

  await worker.run();
};

function createActivityBindings(
  app: NestApplicationContext,
  activityClasses: any[],
): Record<string, any> {
  const activities = {};
  const reflector = new Reflector();

  activityClasses.forEach((activityClass) => {
    const activityInstance = app.get(activityClass);
    Object.getOwnPropertyNames(Object.getPrototypeOf(activityInstance))
      .filter((prop) => {
        const isFunction = typeof activityInstance[prop] === 'function';
        const isConstructor = prop === 'constructor';
        const hasActivityDecorator = reflector.get(
          TEMPORAL_ACTIVITY,
          activityInstance[prop],
        );
        return isFunction && !isConstructor && hasActivityDecorator;
      })
      .forEach((methodName) => {
        activities[methodName] =
          activityInstance[methodName].bind(activityInstance);
      });
  });

  return activities;
}

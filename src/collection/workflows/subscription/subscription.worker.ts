import { NativeConnection, Worker } from '@temporalio/worker';
import {
  ChargeSubscriptionActivity,
  SendEndOfSubscriptionEmailActivity,
  SendReminderEmailActivity,
  SendWelcomeEmailActivity,
} from './activities';
import { CollectionModule } from '../../collection.module';
import { NestFactory } from '@nestjs/core';

async function runWorker() {
  const app = await NestFactory.createApplicationContext(CollectionModule);
  const sendWelcomeEmailActivity = app.get(SendWelcomeEmailActivity);
  const chargeSubscriptionActivity = app.get(ChargeSubscriptionActivity);
  const sendEndOfSubscriptionEmailActivity = app.get(
    SendEndOfSubscriptionEmailActivity,
  );
  const sendReminderEmailActivity = app.get(SendReminderEmailActivity);
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
    activities: {
      sendWelcomeEmail: sendWelcomeEmailActivity.sendWelcomeEmail.bind(
        sendWelcomeEmailActivity,
      ),
      sendReminderEmail: sendReminderEmailActivity.sendReminderEmail.bind(
        sendReminderEmailActivity,
      ),
      sendEndOfSubscriptionEmail:
        sendEndOfSubscriptionEmailActivity.sendEndOfSubscriptionEmail.bind(
          sendEndOfSubscriptionEmailActivity,
        ),
      chargeSubscription: chargeSubscriptionActivity.chargeSubscription.bind(
        chargeSubscriptionActivity,
      ),
    },
  });
  //   const worker = await Worker.create({
  //     workflowsPath: require.resolve('./subscription.workflow'),
  //     activities,
  //     taskQueue: 'subscription-task-queue',
  //   });
  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});

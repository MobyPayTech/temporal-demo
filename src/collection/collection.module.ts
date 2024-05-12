import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { TemporalModule } from 'nestjs-temporal';
import {
  ChargeSubscriptionActivity,
  SendEndOfSubscriptionEmailActivity,
  SendReminderEmailActivity,
  SendWelcomeEmailActivity,
} from './workflows/subscription/activities';

@Module({
  providers: [
    ChargeSubscriptionActivity,
    SendEndOfSubscriptionEmailActivity,
    SendReminderEmailActivity,
    SendWelcomeEmailActivity,
  ],
  exports: [
    ChargeSubscriptionActivity,
    SendEndOfSubscriptionEmailActivity,
    SendReminderEmailActivity,
    SendWelcomeEmailActivity,
  ],
  controllers: [CollectionController],
  imports: [
    // TemporalModule.registerWorker({
    //   workerOptions: {
    //     taskQueue: 'subscription-task-queue',
    //     workflowsPath: require.resolve(
    //       './workflows/subscription/subscription.workflow',
    //     ),
    //   },
    //   activityClasses: [
    //     SendWelcomeEmailActivity,
    //     SendReminderEmailActivity,
    //     SendEndOfSubscriptionEmailActivity,
    //     ChargeSubscriptionActivity,
    //   ],
    // }),

    TemporalModule.registerClient(),
  ],
})
export class CollectionModule {}

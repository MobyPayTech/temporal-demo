import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { TemporalModule } from 'nestjs-temporal';
import {
  ChargeSubscriptionActivity,
  SendEndOfSubscriptionEmailActivity,
  SendReminderEmailActivity,
  SendWelcomeEmailActivity,
} from './workflows/subscription/activities';
import { PaymentModule } from '../payment/payment.module';
// import { PaymentService } from '../payment/payment.service';

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
  imports: [TemporalModule.registerClient(), PaymentModule],
})
export class CollectionModule {}

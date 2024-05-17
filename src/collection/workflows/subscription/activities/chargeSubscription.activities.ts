import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../../../payment/payment.service';
import { Activity } from '../../../../shared/activity.decorator';

@Injectable()
export class ChargeSubscriptionActivity {
  constructor(private paymentService: PaymentService) {}

  @Activity()
  async chargeSubscription(email: string): Promise<string> {
    console.log(`Charging subscription for ${email}...`);
    // throw new Error();

    this.paymentService.create({
      amount: 10,
      duration: 1,
      status: 'paid',
    });
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`subscription charged for ${email}, ...`);

    return 'subscription charged';
  }
}

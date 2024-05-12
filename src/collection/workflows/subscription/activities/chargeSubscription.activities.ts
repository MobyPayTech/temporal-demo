import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { PaymentService } from '../../../../payment/payment.service';

@Injectable()
@Activities()
export class ChargeSubscriptionActivity {
  constructor(private paymentService: PaymentService) {}

  @Activity()
  async chargeSubscription(email: string): Promise<string> {
    console.log(`Charging subscription for ${email}...`);

    this.paymentService.create({
      amount: 100,
      duration: 1,
      status: 'paid',
    });
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`subscription charged for ${email}...`);

    return 'subscription charged';
  }
}

export interface IChargeSubscriptionActivity {
  chargeSubscription(email: string): Promise<string>;
}

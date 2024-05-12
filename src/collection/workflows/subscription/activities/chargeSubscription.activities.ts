import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class ChargeSubscriptionActivity {
  constructor() {}

  @Activity()
  async chargeSubscription(email: string): Promise<string> {
    console.log(`Charging subscription for ${email}...`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`subscription charged for ${email}...`);

    return 'subscription charged';
  }
}

export interface IChargeSubscriptionActivity {
  chargeSubscription(email: string): Promise<string>;
}

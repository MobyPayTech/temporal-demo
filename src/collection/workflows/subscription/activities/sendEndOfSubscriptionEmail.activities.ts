import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class SendEndOfSubscriptionEmailActivity {
  constructor() {}

  @Activity()
  async sendEndOfSubscriptionEmail(email: string): Promise<string> {
    console.log(`Sending end of subscription email to ${email}...`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`end of subscription email sent to ${email}...`);

    return 'end of subscription email sent';
  }
}

export interface ISendEndOfSubscriptionEmailActivity {
  sendEndOfSubscriptionEmail(email: string): Promise<string>;
}

import { Injectable } from '@nestjs/common';
import { Activity } from '../../../../shared/activity.decorator';

@Injectable()
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

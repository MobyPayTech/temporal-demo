import { Injectable } from '@nestjs/common';
import { Activity } from '../../../../shared/activity.decorator';

@Injectable()
export class SendWelcomeEmailActivity {
  constructor() {}

  @Activity()
  async sendWelcomeEmail(email: string): Promise<string> {
    console.log(`Sending welcome email to ${email}...`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`email sent to ${email}...`);

    return 'email sent';
  }
}

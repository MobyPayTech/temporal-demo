import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
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

export interface ISendWelcomeEmailActivity {
  sendWelcomeEmail(name: string): Promise<string>;
}

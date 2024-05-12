import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class SendReminderEmailActivity {
  constructor() {}

  @Activity()
  async sendReminderEmail(email: string): Promise<string> {
    console.log(`Sending reminder email to ${email}...`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`reminder-${this.sampleWorker()} email sent to ${email}...`);

    return 'reminder email sent';
  }

  sampleWorker(): string {
    return 'Sample Worker';
  }
}

export interface ISendReminderEmailActivity {
  sendReminderEmail(email: string): Promise<string>;
}

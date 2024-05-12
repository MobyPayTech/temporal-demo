import { proxyActivities, sleep } from '@temporalio/workflow';
import {
  IChargeSubscriptionActivity,
  ISendEndOfSubscriptionEmailActivity,
  ISendReminderEmailActivity,
  ISendWelcomeEmailActivity,
} from './activities';

const { sendEndOfSubscriptionEmail } =
  proxyActivities<ISendEndOfSubscriptionEmailActivity>({
    startToCloseTimeout: '1 minute',
  });

const { sendWelcomeEmail } = proxyActivities<ISendWelcomeEmailActivity>({
  startToCloseTimeout: '1 minute',
});

const { sendReminderEmail } = proxyActivities<ISendReminderEmailActivity>({
  startToCloseTimeout: '1 minute',
});

const { chargeSubscription } = proxyActivities<IChargeSubscriptionActivity>({
  startToCloseTimeout: '5 minute',
});

export async function subscriptionWorkflow(
  email: string,
  totalMonths: number,
): Promise<void> {
  console.log('Workflow started');
  await sendWelcomeEmail(email);

  for (let month = 1; month <= totalMonths; month++) {
    await chargeSubscription(email);
    await sendReminderEmail(email);

    if (month < totalMonths) {
      await sleep('5s'); // Wait for 30 days before the next charge, 5s for testing purposes
    }
  }

  await sendEndOfSubscriptionEmail(email);
  console.log('Workflow completed');
}

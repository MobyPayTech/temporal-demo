import { proxyActivities, sleep } from '@temporalio/workflow';
import { SubscriptionWorkflowActivities } from './subscription.interface';

const {
  sendEndOfSubscriptionEmail,
  sendReminderEmail,
  sendWelcomeEmail,
  chargeSubscription,
} = proxyActivities<SubscriptionWorkflowActivities>({
  startToCloseTimeout: '1 minute',
});

export async function subscriptionWorkflow(
  email: string,
  totalMonths: number,
): Promise<void> {
  console.log('Workflow started');
  await sendWelcomeEmail(email);

  for (let month = 1; month <= totalMonths; month++) {
    if (month != 1 && month < totalMonths) {
      await sendReminderEmail(email);
      await sleep('2s'); // sleep for day, 2s for testing
    }
    await chargeSubscription(email);

    if (month < totalMonths) {
      await sleep('5s'); // Wait for 29 days before the next charge, 5s for testing purposes
    }
  }

  await sendEndOfSubscriptionEmail(email);
  console.log('Workflow completed');
}

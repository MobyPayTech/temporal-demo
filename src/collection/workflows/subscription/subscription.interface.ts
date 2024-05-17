export interface SubscriptionWorkflowActivities {
  chargeSubscription(email: string): Promise<string>;
  sendEndOfSubscriptionEmail(email: string): Promise<string>;
  sendReminderEmail(email: string): Promise<string>;
  sendWelcomeEmail(name: string): Promise<string>;
}

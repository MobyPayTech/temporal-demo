import { Controller, Get } from '@nestjs/common';
import { InjectTemporalClient } from 'nestjs-temporal';
import { WorkflowClient } from '@temporalio/client';

@Controller('subscriptions')
export class CollectionController {
  constructor(
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
  ) {}

  @Get()
  async createFakeSubscription(): Promise<string> {
    await this.temporalClient.start('subscriptionWorkflow', {
      args: ['aimen@gmail.com', 6],
      taskQueue: 'default',
      workflowId: 'user-subscription-' + Math.floor(Math.random() * 1000),
    });
    return 'Created Fake Subscription';
  }
}

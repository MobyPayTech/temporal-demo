import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, WorkflowClient } from '@temporalio/client';
import { TemporalOptions } from './temporal.options';

@Injectable()
export class TemporalService implements OnModuleInit {
  private client: WorkflowClient;

  constructor(private options: TemporalOptions) {}

  async onModuleInit() {
    const connection = await Connection.connect({ address: 'localhost:7233' });
    this.client = new WorkflowClient({
      connection,
      // namespace: 'foo.bar', // connects to 'default' namespace if not specified
    });
  }
}

// 4y8dhvKl6rcU0hhGlrM5
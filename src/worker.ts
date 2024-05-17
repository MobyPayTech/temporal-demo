import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { subscriptionWorker } from './collection/workflows/subscription/subscription.worker';

const workers: Record<string, any>[] = [
  {
    name: 'subscription',
    worker: subscriptionWorker,
  },
];

async function bootstrap(workerName: string) {
  const logger = new Logger('TemporalWorker');
  const workerRecord = workers.find((worker) => worker.name === workerName);

  if (!workerRecord) {
    logger.error(`Worker ${workerName} not found`);
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);

  workerRecord.worker(app);

  logger.log(`Starting worker ${workerName}`);
}

const workerName = process.argv[2];

if (!workerName || workerName.trim() === '') {
  console.error('Please provide a worker name as an argument.');
  process.exit(1);
}

bootstrap(workerName);

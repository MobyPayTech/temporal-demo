import { Module } from '@nestjs/common';
import { CollectionModule } from './collection/collection.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    CollectionModule,
    MongooseModule.forRoot('mongodb://localhost:27017/temporal'),
    PaymentModule,
  ],
})
export class AppModule {}

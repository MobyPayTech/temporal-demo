import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  amount: number;

  @Prop()
  duration: number;

  @Prop()
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

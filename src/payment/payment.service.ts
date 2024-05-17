import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const payment = new this.paymentModel(createPaymentDto);
    payment.save();
    return 'This action adds a new payment' + createPaymentDto;
  }
}

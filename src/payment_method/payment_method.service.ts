import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePaymentMethodDto } from "./dto/create-payment_method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment_method.dto";
import { Paymentmethod } from "./schemas/payment_method.schema";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(Paymentmethod.name)
    private paymentmethodModel: Model<Paymentmethod>
  ) {}

  async create(createPaymentmethodDto: CreatePaymentMethodDto) {
    return await this.paymentmethodModel.create(createPaymentmethodDto);
  }

  async findAll() {
    return await this.paymentmethodModel.find();
  }

  async findOne(id: string) {
    const item = await this.paymentmethodModel.findById(id);
    if (!item) {
      throw new NotFoundException("Tolov usuli topilmadi");
    }
    return item;
  }

  async update(id: string, updatePaymentmethodDto: UpdatePaymentMethodDto) {
    const updated = await this.paymentmethodModel.findByIdAndUpdate(
      id,
      updatePaymentmethodDto
    );
    if (!updated) {
      throw new NotFoundException("Tolov usuli topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.paymentmethodModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Tolov usuli topilmadi");
    }
    return deleted;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CustomerCard,
} from "./schemas/customer_card.schema";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";

@Injectable()
export class CustomerCardsService {
  constructor(
    @InjectModel(CustomerCard.name)
    private customerCardModel: Model<CustomerCard>
  ) {}

  create(data: CreateCustomerCardDto) {
    return this.customerCardModel.create(data);
  }

  findAll() {
    return this.customerCardModel.find().populate("customer_id");
  }

  findOne(id: string) {
    return this.customerCardModel.findById(id).populate("customer_id");
  }

  update(id: string, data: UpdateCustomerCardDto) {
    return this.customerCardModel.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id: string) {
    return this.customerCardModel.findByIdAndDelete(id);
  }
}

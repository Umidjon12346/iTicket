import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CustomerAddress
} from "./schemas/customer_address.schema";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private addressModel: Model<CustomerAddress>
  ) {}

  create(data: CreateCustomerAddressDto) {
    return this.addressModel.create(data);
  }

  findAll() {
    return this.addressModel.find().populate("customer_id");
  }

  findOne(id: string) {
    return this.addressModel.findById(id).populate("customer_id");
  }

  update(id: string, data: UpdateCustomerAddressDto) {
    return this.addressModel.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id: string) {
    return this.addressModel.findByIdAndDelete(id);
  }
}

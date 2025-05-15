import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "./schemas/customer.schema";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>
  ) {}

  create(data: CreateCustomerDto) {
    return this.customerModel.create(data);
  }

  findAll() {
    return this.customerModel.find();
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.customerModel.findOne({ email });
  }

  update(id: string, data: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }

  async findCustomerByRefresh(refresh_token: string) {
    const customers = await this.customerModel.find();

    for (const customer of customers) {
      const storedToken = customer.hashed_refresh_token;

      if (!storedToken) continue;

      const match = await bcrypt.compare(refresh_token, storedToken);
      if (match) return customer;
    }
    return null;
  }
}

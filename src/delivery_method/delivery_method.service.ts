import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeliveryMethodDto } from "./dto/create-delivery_method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery_method.dto";
import { Deliverymethod } from "./schemas/delivery_method.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(Deliverymethod.name)
    private deliverymethodModel: Model<Deliverymethod>
  ) {}

  create(createDeliverymethodDto: CreateDeliveryMethodDto) {
    return this.deliverymethodModel.create({ ...createDeliverymethodDto });
  }

  findAll() {
    return this.deliverymethodModel.find();
  }

  findOne(id: string) {
    const item = this.deliverymethodModel.findById(id);
    if (!item) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }

  update(id: string, updateDeliverymethodDto: UpdateDeliveryMethodDto) {
    const updated = this.deliverymethodModel.findByIdAndUpdate(
      id,
      updateDeliverymethodDto
    );
    if (!updated) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.deliverymethodModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Yetkazib berish usuli topilmadi");
    }
  }
}

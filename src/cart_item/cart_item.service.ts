import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cartitem } from "./schemas/cart_item.schema";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(Cartitem.name) private cartitemModel: Model<Cartitem>
  ) {}

  create(createCartitemDto: CreateCartItemDto) {
    return this.cartitemModel.create({ ...createCartitemDto });
  }

  findAll() {
    return this.cartitemModel.find().populate("cart_id product_id"); 
  }

  async findOne(id: string) {
    const cartitem = await this.cartitemModel.findById(id);
    if (!cartitem) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return cartitem;
  }

  async update(id: string, updateCartitemDto: UpdateCartItemDto) {
    const updated = await this.cartitemModel.findByIdAndUpdate(
      id,
      updateCartitemDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cartitemModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Cartitem topilmadi");
    }
    return deleted;
  }
}

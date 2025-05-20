import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./schemas/cart.schema"; // Agar schema boshqa joyda bo‘lsa, to‘g‘rilang

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  create(createCartDto: CreateCartDto) {
    return this.cartModel.create({ ...createCartDto });
  }

  findAll() {
    return this.cartModel.find().populate("user_id"); // kerakli fieldni populate qiling
  }

  async findOne(id: string) {
    const cart = await this.cartModel.findById(id);
    if (!cart) {
      throw new NotFoundException("Cart topilmadi");
    }
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const updated = await this.cartModel.findByIdAndUpdate(id, updateCartDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException("Cart topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cartModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Cart topilmadi");
    }
    return deleted;
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./schemas/booking.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>
  ) {}

  create(createBookingDto: CreateBookingDto) {
    return this.bookingModel.create({ ...createBookingDto });
  }

  findAll() {
    return this.bookingModel.find();
  }

  findOne(id: string) {
    const item = this.bookingModel.findById(id);
    if (!item) {
      throw new NotFoundException("Buyurtma topilmadi");
    }
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    const updated = this.bookingModel.findByIdAndUpdate(id, updateBookingDto);
    if (!updated) {
      throw new NotFoundException("Buyurtma topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.bookingModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Buyurtma topilmadi");
    }
  }
}

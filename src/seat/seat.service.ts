import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { Seat } from "./schemas/seat.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat.name) private seatModel: Model<Seat>) {}

  create(createSeatDto: CreateSeatDto) {
    return this.seatModel.create({ ...createSeatDto });
  }

  findAll() {
    return this.seatModel.find().populate(["seattype_id", "venue_id"]);
  }

  findOne(id: string) {
    const seat = this.seatModel.findById(id);
    if (!seat) {
      throw new NotFoundException("Seat topilmadi");
    }
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    const updated = this.seatModel.findByIdAndUpdate(id, updateSeatDto);
    if (!updated) {
      throw new NotFoundException("Seat topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.seatModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Seat topilmadi");
    }
  }
}

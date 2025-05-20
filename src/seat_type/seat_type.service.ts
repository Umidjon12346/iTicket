import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { SeatType } from "./schemas/seat_type.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name) private seattypeModel: Model<SeatType>
  ) {}

  create(createSeattypeDto: CreateSeatTypeDto) {
    return this.seattypeModel.create({ ...createSeattypeDto });
  }

  findAll() {
    return this.seattypeModel.find();
  }

  findOne(id: string) {
    const seattype = this.seattypeModel.findById(id);
    if (!seattype) {
      throw new NotFoundException("Seattype topilmadi");
    }
  }

  update(id: string, updateSeattypeDto: UpdateSeatTypeDto) {
    const updated = this.seattypeModel.findByIdAndUpdate(id, updateSeattypeDto);
    if (!updated) {
      throw new NotFoundException("Seattype topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.seattypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Seattype topilmadi");
    }
  }
}

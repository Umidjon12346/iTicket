import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { Eventype } from "./schemas/event_type.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EventypeService {
  constructor(
    @InjectModel(Eventype.name) private eventypeModel: Model<Eventype>
  ) {}

  create(createEventypeDto: CreateEventTypeDto) {
    return this.eventypeModel.create({ ...createEventypeDto });
  }

  findAll() {
    return this.eventypeModel.find();
  }

  findOne(id: string) {
    const eventype = this.eventypeModel.findById(id);
    if (!eventype) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }

  update(id: string, updateEventypeDto: UpdateEventTypeDto) {
    const updated = this.eventypeModel.findByIdAndUpdate(id, updateEventypeDto);
    if (!updated) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.eventypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Eventype topilmadi");
    }
  }
}

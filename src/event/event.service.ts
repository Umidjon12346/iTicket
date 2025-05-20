import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./schemas/event.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  create(createEventDto: CreateEventDto) {
    return this.eventModel.create({ ...createEventDto });
  }

  findAll() {
    return this.eventModel.find();
  }

  findOne(id: string) {
    const event = this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException("Event topilmadi");
    }
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const updated = this.eventModel.findByIdAndUpdate(id, updateEventDto);
    if (!updated) {
      throw new NotFoundException("Event topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.eventModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Event topilmadi");
    }
  }
}

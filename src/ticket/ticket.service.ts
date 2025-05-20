import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "./schemas/ticket.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketModel.create({ ...createTicketDto });
  }

  findAll() {
    return this.ticketModel.find().populate("user_id"); // populate qismi kerak bo‘lsa o‘zgartirasiz
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) {
      throw new NotFoundException("Ticket topilmadi");
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const updated = await this.ticketModel.findByIdAndUpdate(
      id,
      updateTicketDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException("Ticket topilmadi");
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.ticketModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Ticket topilmadi");
    }
    return deleted;
  }
}

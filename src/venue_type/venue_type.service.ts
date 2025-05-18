import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { VenueType } from "./schemas/venue_type.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType.name) private venueptypeModel: Model<VenueType>
  ) {}

  create(createVenueptypeDto: CreateVenueTypeDto) {
    return this.venueptypeModel.create({ ...createVenueptypeDto });
  }

  findAll() {
    return this.venueptypeModel.find();
  }

  findOne(id: string) {
    const venueptype = this.venueptypeModel.findById(id);
    if (!venueptype) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return venueptype;
  }

  update(id: string, updateVenueptypeDto: UpdateVenueTypeDto) {
    const updated = this.venueptypeModel.findByIdAndUpdate(
      id,
      updateVenueptypeDto
    );
    if (!updated) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return updated
  }

  remove(id: string) {
    const deleted = this.venueptypeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venueptype topilmadi");
    }
    return {message:"ochidu",deleted}
  }
}

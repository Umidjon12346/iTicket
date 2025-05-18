import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { Venue } from "./schemas/venue.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name) private venueModel: Model<Venue>) {}

  create(createVenueDto: CreateVenueDto) {
    return this.venueModel.create({ ...createVenueDto });
  }

  findAll() {
    return this.venueModel.find().populate(["district_id", "region_id"]);
  }

  findOne(id: string) {
    const venue = this.venueModel.findById(id);
    if (!venue) {
      throw new NotFoundException("Venue topilmadi");
    }
    return venue
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    const updated = this.venueModel.findByIdAndUpdate(id, updateVenueDto);
    if (!updated) {
      throw new NotFoundException("Venue topilmadi");
    }
    return { message: "Yangilandi", updated };
  }

  remove(id: string) {
    const deleted = this.venueModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venue topilmadi");
    }
    return {message:"Ochirildi",deleted}
  }
}

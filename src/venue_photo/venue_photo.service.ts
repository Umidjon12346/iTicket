import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { VenuePhoto } from "./schemas/venue_photo.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name) private venuephotoModel: Model<VenuePhoto>
  ) {}

  create(createVenuephotoDto: CreateVenuePhotoDto) {
    return this.venuephotoModel.create({ ...createVenuephotoDto });
  }

  findAll() {
    return this.venuephotoModel.find();
  }

  findOne(id: string) {
    const venuephoto = this.venuephotoModel.findById(id);
    if (!venuephoto) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return venuephoto
  }

  update(id: string, updateVenuephotoDto: UpdateVenuePhotoDto) {
    const updated = this.venuephotoModel.findByIdAndUpdate(
      id,
      updateVenuephotoDto
    );
    if (!updated) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return { message: "yangilando", updated };
  }

  remove(id: string) {
    const deleted = this.venuephotoModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Venuephoto topilmadi");
    }
    return {message:"Ocheirldi",deleted}
  }
}

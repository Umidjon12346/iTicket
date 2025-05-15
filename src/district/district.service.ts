import { Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schema/district.schema";
import { Model } from "mongoose";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>
  ) {}

  create(createDistrictDto: CreateDistrictDto) {
    return this.districtSchema.create(createDistrictDto);
  }

  findAll() {
    return this.districtSchema.find();
  }

  findOne(id: string) {
    return this.districtSchema.findById(id);
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return await this.districtSchema.findByIdAndUpdate(id, updateDistrictDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.districtSchema.findByIdAndDelete(id);
  }
}

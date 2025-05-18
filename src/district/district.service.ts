import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schema/district.schema";
import mongoose, { Model } from "mongoose";
import { Region } from "../region/schema/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionschema: Model<Region>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const { region_id } = createDistrictDto;
    if (!mongoose.isValidObjectId(region_id)) {
      throw new BadRequestException("region i dyoqqqq");
    }
    const region = await this.regionschema.findById(region_id)
    if(!region){
      throw new BadRequestException("yoqqqqqqqqqqq")
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district)
    await region.save()
    return district
  }

  findAll() {
    return this.districtSchema.find().populate("regionId");
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

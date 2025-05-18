import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private  regionSchema: Model<Region>
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionSchema.create(createRegionDto);
  }

  findAll() {
    return this.regionSchema.find().populate("districts");
  }

  findOne(id: string) {
    return this.regionSchema.findById(id);
  }

  async update(id: string, updateAdminDto: UpdateRegionDto) {
    return await this.regionSchema.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.regionSchema.findByIdAndDelete(id);
  }
}

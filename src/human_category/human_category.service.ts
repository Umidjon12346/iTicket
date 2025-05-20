import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHumancategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";
import { Humancategory } from "./schemas/human_category.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class HumancategoryService {
  constructor(
    @InjectModel(Humancategory.name)
    private humancategoryModel: Model<Humancategory>
  ) {}

  create(createHumancategoryDto: CreateHumancategoryDto) {
    return this.humancategoryModel.create({ ...createHumancategoryDto });
  }

  findAll() {
    return this.humancategoryModel.find();
  }

  findOne(id: string) {
    const humancategory = this.humancategoryModel.findById(id);
    if (!humancategory) {
      throw new NotFoundException("Humancategory topilmadi");
    }
  }

  update(id: string, updateHumancategoryDto: UpdateHumanCategoryDto) {
    const updated = this.humancategoryModel.findByIdAndUpdate(
      id,
      updateHumancategoryDto
    );
    if (!updated) {
      throw new NotFoundException("Humancategory topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.humancategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Humancategory topilmadi");
    }
  }
}

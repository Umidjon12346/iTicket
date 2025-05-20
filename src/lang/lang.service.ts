import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLangDto } from "./dto/create-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";
import { Lang } from "./schemas/lang.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private langModel: Model<Lang>) {}

  create(createLangDto: CreateLangDto) {
    return this.langModel.create({ ...createLangDto });
  }

  findAll() {
    return this.langModel.find();
  }

  findOne(id: string) {
    const lang = this.langModel.findById(id);
    if (!lang) {
      throw new NotFoundException("Lang topilmadi");
    }
  }

  update(id: string, updateLangDto: UpdateLangDto) {
    const updated = this.langModel.findByIdAndUpdate(id, updateLangDto);
    if (!updated) {
      throw new NotFoundException("Lang topilmadi");
    }
  }

  remove(id: string) {
    const deleted = this.langModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Lang topilmadi");
    }
  }
}

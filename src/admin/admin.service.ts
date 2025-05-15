import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminSchema: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const admin = await this.adminSchema.findOne({ email });
    if (admin) {
      throw new BadRequestException("Bunday email bor");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollr mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  findAll() {
    return this.adminSchema.find();
  }

  async findByEmail(email: string) {
    return await this.adminSchema.findOne({ email });
  }

  findOne(id: string) {
    return this.adminSchema.findById(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return await this.adminSchema.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
  }
  async updateRefreshToken(id: string, hashed_refresh_token: string) {
    return await this.adminSchema.findByIdAndUpdate(
      id,
      { hashed_refresh_token },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.adminSchema.findByIdAndDelete(id);
  }
}

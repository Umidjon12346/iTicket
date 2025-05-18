import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { District } from "../../district/schema/district.schema";

@Schema()
export class Region {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "District" }] }) // Bog‘lanish: District → Region
  districts: District[];
}
  

export const RegionSchema = SchemaFactory.createForClass(Region);


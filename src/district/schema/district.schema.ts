import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Region, RegionSchema } from "../../region/schema/region.schema";
import { Types } from "mongoose";

@Schema()
export class District {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Region" }) // Bog‘lanish: District → Region
  region_id: Types.ObjectId;
}

export const DistrictSchema = SchemaFactory.createForClass(District);

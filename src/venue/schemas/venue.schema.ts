import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type VenueDocument = HydratedDocument<Venue>;

@Schema()
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone_number: string;

  @Prop()
  schema: string;

  @Prop({ type: Types.ObjectId, ref: "Region" })
  region_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "District" })
  district_id: Types.ObjectId;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

export type VenueptypeDocument = HydratedDocument<VenueType>;

@Schema()
export class VenueType {
  @Prop({ type: Types.ObjectId, ref: "Venue" })
  venue_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "type" })
  type_id: Types.ObjectId;
}

export const VenuetypeSchema = SchemaFactory.createForClass(VenueType);
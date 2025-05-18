import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type VenuePhotoDocument = HydratedDocument<VenuePhoto>;

@Schema()
export class VenuePhoto {
  @Prop()
  url: string;

  @Prop({ type: Types.ObjectId, ref: "Venue" })
  venue_id: Types.ObjectId;
}

export const VenuephotoSchema = SchemaFactory.createForClass(VenuePhoto);

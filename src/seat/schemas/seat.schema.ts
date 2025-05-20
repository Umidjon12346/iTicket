import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SaetDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop()
  sector: string;

  @Prop()
  row_number: number;

  @Prop({ type: Types.ObjectId, ref: "Venue" })
  venue_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Seattype" })
  seattype_id: Types.ObjectId;

  @Prop()
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SeattypeDocument = HydratedDocument<SeatType>;

@Schema()
export class SeatType {
  @Prop({ required: true })
  name: string;
}

export const SeattypeSchema = SchemaFactory.createForClass(SeatType);

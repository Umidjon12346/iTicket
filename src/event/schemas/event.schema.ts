import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop()
  start_time: Date;

  @Prop()
  finish_date: Date;

  @Prop()
  finish_time: Date;

  @Prop()
  info: string;

  @Prop()
  relase_date: string;

  @Prop({ type: Types.ObjectId, ref: "Eventype" })
  event_type_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Humancategory" })
  human_category_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Venue" })
  venue_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Lang" })
  lang_id: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventypeDocument = HydratedDocument<Eventype>;

@Schema()
export class Eventype {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Eventype" })
  parent_id: Types.ObjectId;
}

export const EventypeSchema = SchemaFactory.createForClass(Eventype);

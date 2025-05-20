import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HumancategoryDocument = HydratedDocument<Humancategory>;

@Schema()
export class Humancategory {
  @Prop()
  name: string;

  @Prop()
  start_age: number;

  @Prop()
  finish_age: number;

  @Prop()
  gender: boolean;
}

export const HumancategorySchema = SchemaFactory.createForClass(Humancategory);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;

  @Prop()
  hashed_password: string;

  @Prop()
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: number;

  @Prop()
  lang_id: number;

  @Prop()
  hashed_refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

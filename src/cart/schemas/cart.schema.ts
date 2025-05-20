import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: "Customer" })
  customer_id: Types.ObjectId;

  @Prop()
  created_at: Date;

  @Prop()
  finished_at: Date;

  @Prop()
  status_id: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

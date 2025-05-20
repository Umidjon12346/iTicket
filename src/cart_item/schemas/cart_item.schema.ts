import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

@Schema()
export class Cartitem {
  @Prop({ type: Types.ObjectId, ref: "Ticket" })
  ticket_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Cart" })
  cart_id: Types.ObjectId;
}

export type CartitemDocument = HydratedDocument<Cartitem>;
export const CartitemSchema = SchemaFactory.createForClass(Cartitem);

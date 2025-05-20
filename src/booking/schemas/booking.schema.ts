import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ type: Types.ObjectId, ref: "Cart" })
  cart_id: Types.ObjectId;

  @Prop()
  created_at: Date;

  @Prop()
  finished_at: Date;

  @Prop({ type: Types.ObjectId, ref: "Paymentmethod" })
  paymentmethod_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Delivermethod" })
  delivermethod_id: Types.ObjectId;

  @Prop()
  status_id: number;

  @Prop()
  discountcupon_id: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

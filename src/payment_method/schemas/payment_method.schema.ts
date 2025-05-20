import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentmethodDocument = HydratedDocument<Paymentmethod>;

@Schema()
export class Paymentmethod {
  @Prop()
  name: string;
}

export const PaymentmethodSchema = SchemaFactory.createForClass(Paymentmethod);

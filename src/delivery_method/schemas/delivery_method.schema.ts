import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DeliverymethodDocument = HydratedDocument<Deliverymethod>;

@Schema()
export class Deliverymethod {
  @Prop()
  name: string;
}

export const DeliverymethodSchema =
  SchemaFactory.createForClass(Deliverymethod);

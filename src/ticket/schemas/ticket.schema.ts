import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop()
  price: number;

  @Prop()
  service_fee: number;

  @Prop()
  ticket_type: string;

  @Prop({ type: Types.ObjectId, ref: "Event" })
  event_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Seat" })
  seat_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Status" })
  status_id: Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

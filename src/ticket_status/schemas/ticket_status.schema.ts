import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TicketstatusDocument = HydratedDocument<Ticketstatus>;

@Schema()
export class Ticketstatus {
  @Prop()
  name: string;
}

export const TicketstatusSchema = SchemaFactory.createForClass(Ticketstatus);

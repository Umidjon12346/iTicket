import { Types } from "mongoose";

export class CreateVenueTypeDto {
  venue_id: Types.ObjectId;
  type_id: Types.ObjectId;
}

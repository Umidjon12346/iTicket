import { Types } from "mongoose";

export class CreateVenuePhotoDto {
  url: string;
  venue_id: Types.ObjectId;
}

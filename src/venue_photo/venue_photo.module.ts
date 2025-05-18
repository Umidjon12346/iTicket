import { Module } from "@nestjs/common";
import { VenuePhotoService } from "./venue_photo.service";
import { VenuePhotoController } from "./venue_photo.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenuePhoto } from "./schemas/venue_photo.schema";
import { VenueSchema } from "../venue/schemas/venue.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VenuePhoto.name, schema: VenueSchema }]),
  ],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService],
})
export class VenuePhotoModule {}

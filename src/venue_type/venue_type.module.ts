import { Module } from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { VenueTypeController } from './venue_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VenueType, VenuetypeSchema } from './schemas/venue_type.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:VenueType.name,schema:VenuetypeSchema}])],
  controllers: [VenueTypeController],
  providers: [VenueTypeService],
})
export class VenueTypeModule {}

import { Module } from '@nestjs/common';
import { EventypeService } from './event_type.service';
import { EventTypeController } from './event_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Eventype, EventypeSchema } from './schemas/event_type.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Eventype.name,schema:EventypeSchema}])],
  controllers: [EventTypeController],
  providers: [EventypeService],
})
export class EventTypeModule {}

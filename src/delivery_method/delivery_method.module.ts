import { Module } from '@nestjs/common';
import { DeliveryMethodService } from './delivery_method.service';
import { DeliveryMethodController } from './delivery_method.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deliverymethod, DeliverymethodSchema } from './schemas/delivery_method.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Deliverymethod.name,schema:DeliverymethodSchema}])],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
})
export class DeliveryMethodModule {}

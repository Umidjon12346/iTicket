import { Module } from '@nestjs/common';
import { CustomerCardsService } from './customer_cards.service';
import { CustomerCardsController } from './customer_cards.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CustomerCard } from './schemas/customer_card.schema';
import { CustomerSchema } from '../customer/schemas/customer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:CustomerCard.name,schema:CustomerSchema}])],
  controllers: [CustomerCardsController],
  providers: [CustomerCardsService],
})
export class CustomerCardsModule {}

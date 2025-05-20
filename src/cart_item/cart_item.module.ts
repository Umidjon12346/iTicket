import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cartitem, CartitemSchema } from './schemas/cart_item.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Cartitem.name,schema:CartitemSchema}])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}

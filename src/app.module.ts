import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerCardsModule } from './customer_cards/customer_cards.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { VenueModule } from './venue/venue.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { TypeModule } from './type/type.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketStatusModule } from './ticket_status/ticket_status.module';
import { SeatModule } from './seat/seat.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { LangModule } from './lang/lang.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { EventModule } from './event/event.module';
import { EventTypeModule } from './event_type/event_type.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    RegionModule,
    DistrictModule,
    CustomerModule,
    CustomerCardsModule,
    CustomerAddressModule,
    VenueModule,
    VenuePhotoModule,
    VenueTypeModule,
    TypeModule,
    TicketModule,
    TicketStatusModule,
    SeatModule,
    SeatTypeModule,
    PaymentMethodModule,
    LangModule,
    HumanCategoryModule,
    EventModule,
    EventTypeModule,
    DeliveryMethodModule,
    CartModule,
    CartItemModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

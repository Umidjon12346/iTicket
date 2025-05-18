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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

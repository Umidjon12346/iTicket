import { Module } from '@nestjs/common';
import { HumancategoryService } from './human_category.service';
import { HumanCategoryController } from './human_category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Humancategory, HumancategorySchema } from './schemas/human_category.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Humancategory.name,schema:HumancategorySchema}])],
  controllers: [HumanCategoryController],
  providers: [HumancategoryService],
})
export class HumanCategoryModule {}

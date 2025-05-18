import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerCardsService } from './customer_cards.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@Controller('customer-cards')
export class CustomerCardsController {
  constructor(private readonly customerCardsService: CustomerCardsService) {}

  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardsService.create(createCustomerCardDto);
  }

  @Get()
  findAll() {
    return this.customerCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardsService.update(id, updateCustomerCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCardsService.remove(id);
  }
}

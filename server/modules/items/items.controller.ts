import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
// import { CreateItemDto, UpdateItemDto, ListAllEntities } from './dto';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService  } from './items.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) { }

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.create(createItemDto);
    }

    @Get()
    async findAll() {
        const items = await this.itemService.findAll();
        return items;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateItemDto) {
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.itemService.delete(id);
    }
}
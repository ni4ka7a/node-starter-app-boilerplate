import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) { }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async update(id, update): Promise<any> {
        return this.itemModel.findOneAndUpdate({ _id: id }, update, { new: true });
    }

    async delete(id): Promise<any> {
        return this.itemModel.findOneAndDelete({ _id: id });
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async findOne(id): Promise<Item> {
        const items = await this.itemModel.find({ _id: id }).exec();
        if (items && items.length > 0) {
            return items[0];
        } else {
            return null;
        }
    }
}

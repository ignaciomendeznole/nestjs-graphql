import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const item = this.itemRepository.create(createItemInput);
    return await this.itemRepository.save(item);
  }

  async findAll() {
    return await this.itemRepository.find({
      where: { active: true },
    });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id, active: true },
    });

    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    const itemToUpdate = await this.itemRepository.preload(updateItemInput);

    if (!itemToUpdate) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    return await this.itemRepository.save(itemToUpdate);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    const removedItem = this.itemRepository.merge(item, { active: false });

    return await this.itemRepository.save(removedItem);
  }
}

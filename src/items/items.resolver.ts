import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return await this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    return await this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  async removeItem(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Item> {
    return await this.itemsService.remove(id);
  }
}

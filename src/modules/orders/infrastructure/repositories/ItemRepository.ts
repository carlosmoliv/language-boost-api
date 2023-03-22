import { itemModel } from "../../../models";
import { ICreateItemDTO } from "../../domain/dtos/ICreateItemDTO";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { Item } from "../mongo/models/Item";

export class ItemRepository implements IItemRepository {
  async create(data: ICreateItemDTO): Promise<Item> {
    return itemModel.create(data);
  }
}

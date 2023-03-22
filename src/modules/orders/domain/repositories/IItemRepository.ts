import { itemModel } from "../../../models";
import { Item } from "../../infrastructure/mongo/models/Item";
import { ICreateItemDTO } from "../dtos/ICreateItemDTO";

export interface IItemRepository {
  create(data: ICreateItemDTO): Promise<Item>;
}

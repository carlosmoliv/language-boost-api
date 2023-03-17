import { Module } from "../../Infrastructure/models/Module";
import { ICreateModuleDTO } from "../dtos/ICreateModule.dto";

export interface IModuleRepository {
  create(data: ICreateModuleDTO): Promise<Module>;
}

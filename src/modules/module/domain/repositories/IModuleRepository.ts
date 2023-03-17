import { Module } from "../../Infrastructure/models/Module";
import { ICreateModuleDTO } from "../dtos/ICreateModule.dto";

export interface IModuleRepository {
  findById(moduleId: string): Promise<Module | null>;
  create(data: ICreateModuleDTO): Promise<Module>;
}

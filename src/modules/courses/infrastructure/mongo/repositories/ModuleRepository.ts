import { courseModel, moduleModel } from "../../../../models";
import { ICreateModuleDTO } from "../../../domain/dtos/ICreateModule.dto";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { Module } from "../models/Module";

export class ModuleRepository implements IModuleRepository {
  async findById(moduleId: string): Promise<Module | null> {
    return moduleModel.findById(moduleId);
  }

  async create(data: ICreateModuleDTO): Promise<Module> {
    return moduleModel.create(data).then(async (module) => {
      await courseModel.findByIdAndUpdate(data.courseId, {
        $push: { modules: module.id },
      });

      return module;
    });
  }
}

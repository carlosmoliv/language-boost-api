import { Module } from "../../../Infrastructure/models/Module";
import { ICreateModuleDTO } from "../../dtos/ICreateModule.dto";
import { IModuleRepository } from "../IModuleRepository";

export class ModuleRepositoryInMemory implements IModuleRepository {
  private modules: Module[] = [];

  async findById(moduleId: string): Promise<Module | null> {
    return this.modules.find((module) => module.id === moduleId) ?? null;
  }

  async create(data: ICreateModuleDTO): Promise<Module> {
    const module = new Module();

    Object.assign(module, {
      id: this.generateId(),
      title: data.title,
      courseId: data.courseId,
    });

    this.modules.push(module);
    return module;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

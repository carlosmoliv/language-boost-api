import { container } from "tsyringe";

import "./providers";
import { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository";
import { ICourseRepository } from "../../modules/courses/domain/repositories/ICourseRepository";
import { IModuleRepository } from "../../modules/courses/domain/repositories/IModuleRepository";
import { ILessonRepository } from "../../modules/courses/domain/repositories/ILessonsRepository";
import { IOrderRepository } from "../../modules/orders/domain/repositories/IOrderRepository";

import { UserRepository } from "../../modules/users/infrastructure/mongo/repositories/UserRepository";
import { CourseRepository } from "../../modules/courses/infrastructure/mongo/repositories/CourseRepository";
import { ModuleRepository } from "../../modules/courses/infrastructure/mongo/repositories/ModuleRepository";
import { LessonRepository } from "../../modules/courses/infrastructure/mongo/repositories/LessonRepository";
import { OrderRepository } from "../../modules/orders/infrastructure/repositories/OrderRepository";
import { IItemRepository } from "../../modules/orders/domain/repositories/IItemRepository";
import { ItemRepository } from "../../modules/orders/infrastructure/repositories/ItemRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICourseRepository>(
  "CourseRepository",
  CourseRepository
);

container.registerSingleton<IModuleRepository>(
  "ModuleRepository",
  ModuleRepository
);

container.registerSingleton<ILessonRepository>(
  "LessonRepository",
  LessonRepository
);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<IItemRepository>("ItemRepository", ItemRepository);

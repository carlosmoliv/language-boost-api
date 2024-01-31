import { MongoStudentRepository } from '@infra/db/mongo/repositories'

export const makeMongoUserRepository = (): MongoStudentRepository => new MongoStudentRepository()

import { MongoStudentRepository } from '@infra/db/mongo/repositories'

export const makeMongoStudentRepository = (): MongoStudentRepository => new MongoStudentRepository()

import { MongoUserRepository } from '@infra/db/mongo/repositories'

export const makeMongoUserRepository = (): MongoUserRepository => new MongoUserRepository()

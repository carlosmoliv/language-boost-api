import { MongoConnection } from '@infra/db/mongo/helpers'

export const makeMongoConnection = (): MongoConnection => MongoConnection.getInstance()

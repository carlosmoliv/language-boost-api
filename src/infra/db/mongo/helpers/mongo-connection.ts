import { connect, disconnect, connection, ClientSession, Connection } from 'mongoose'

import { ConnectionNotInitializedError, TransactionNotInitializedError } from '@infra/db/mongo/helpers/errors'
import { DbTransaction } from '@presentation/contracts'

export class MongoConnection implements DbTransaction {
  private static instance?: MongoConnection
  private connection?: Connection
  public session?: ClientSession
  uri?: string

  static getInstance (): MongoConnection {
    if (!this.instance) this.instance = new MongoConnection()
    return this.instance
  }

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.connection = await connect(uri).then(() => connection)
  }

  async disconnect (): Promise<void> {
    await disconnect()
  }

  async openTransaction (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotInitializedError()
    this.session = await this.connection.startSession()
    this.session.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.session === undefined) throw new TransactionNotInitializedError()
    await this.session.endSession()
  }

  async commitTransaction (): Promise<void> {
    if (this.session === undefined) throw new TransactionNotInitializedError()
    await this.session.commitTransaction()
  }

  async rollbackTransaction (): Promise<void> {
    if (this.session === undefined) throw new TransactionNotInitializedError()
    await this.session.abortTransaction()
  }

  async clearCollections (collectionNames: string[]): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotInitializedError()
    const collections = Object.keys(this.connection.collections)
    for (const collectionName of collections) {
      if (collectionNames.includes(collectionName)) {
        const collection = this.connection.collections[collectionName]
        await collection.deleteMany({})
      }
    }
  }
}

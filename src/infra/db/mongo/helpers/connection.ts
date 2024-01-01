import { connect, disconnect, connection } from 'mongoose'

export const MongoHelper = {
  uri: '',

  async connect (uri: string): Promise<void> {
    this.uri = uri
    await connect(uri)
  },

  async disconnect (): Promise<void> {
    await disconnect()
  },

  async clearCollections (collectionNames: string[]): Promise<void> {
    const collections = Object.keys(connection.collections)
    for (const collectionName of collections) {
      if (collectionNames.includes(collectionName)) {
        const collection = connection.collections[collectionName]
        await collection.deleteMany({})
      }
    }
  }
}

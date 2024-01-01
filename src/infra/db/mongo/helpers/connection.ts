import { connect, disconnect } from 'mongoose'

export const MongoHelper = {
  uri: '',

  async connect (uri: string): Promise<void> {
    this.uri = uri
    await connect(uri)
  },

  async disconnect (): Promise<void> {
    await disconnect()
  }
}

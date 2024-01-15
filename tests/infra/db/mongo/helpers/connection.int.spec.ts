import { MongoConnection } from '@infra/db/mongo/helpers'

describe('MongoConnection', () => {
  let mongoConnection: MongoConnection

  beforeEach(async () => {
    mongoConnection = MongoConnection.getInstance()
    await mongoConnection.connect('mongodb://localhost:27017/knowledge-boost-api-test')
  })

  afterEach(async () => {
    await mongoConnection.disconnect()
  })

  it('should open a transaction', async () => {
    await mongoConnection.openTransaction()

    expect(mongoConnection.session).toBeDefined()
    await mongoConnection.closeTransaction()
  })
})

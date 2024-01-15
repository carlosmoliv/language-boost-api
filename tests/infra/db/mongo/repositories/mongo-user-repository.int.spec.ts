import { makeFakeUser } from '@tests/factories'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoUserRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'

describe('MongoUserRepository', () => {
  let sut: MongoUserRepository
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    sut = new MongoUserRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('create', () => {
    it('should create an User', async () => {
      const data = makeFakeUser()

      await sut.create(data)

      const user = await sut.findByCriteria({ email: data.email })
      expect(user?.id).toBeTruthy()
      expect(user?.name).toBe(data.name)
      expect(user?.email).toBe(data.email)
    })
  })

  describe('findByCriteria()', () => {
    it('should return an User when passing email as a criteria', async () => {
      const data = makeFakeUser()
      await sut.create(data)

      const result = await sut.findByCriteria({ email: data.email })

      expect(result?.email).toBe(data.email)
    })

    it('should return null when no User is found', async () => {
      const result = await sut.findByCriteria({ id: 'any_id' })

      expect(result).toBeNull()
    })
  })
})

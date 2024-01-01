import { makeFakeUser } from '@tests/factories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { env } from '@main/config/env'

describe('MongoUserRepository', () => {
  let sut: MongoUserRepository

  beforeAll(async () => {
    await MongoHelper.connect(env.db.mongo.uri)
    sut = new MongoUserRepository()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
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
  })
})

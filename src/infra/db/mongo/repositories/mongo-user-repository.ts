import { MongoUserModel } from '@infra/db/mongo/models'
import { UserRepository } from '@application/contracts/repositories'

export class MongoUserRepository implements UserRepository {
  async findByCriteria (input: UserRepository.FindByCriteriaInput): Promise<UserRepository.FindByCriteriaOutput> {
    return MongoUserModel.findOne(input)
  }

  async create ({ name, email, password }: UserRepository.CreateInput): Promise<void> {
    await MongoUserModel.create({ name, email, password })
  }
}

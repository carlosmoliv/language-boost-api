import { MongoUserModel } from '@infra/db/mongo/models'
import { UserRepository } from '@data/contracts/repositories'

export class MongoUserRepository implements UserRepository {
  async findByEmail ({ email }: UserRepository.FindByEmailInput): Promise<UserRepository.FindByEmailOutput> {
    return MongoUserModel.findOne({ email })
  }

  async create ({ name, email, password }: UserRepository.CreateInput): Promise<void> {
    await MongoUserModel.create({ name, email, password })
  }
}

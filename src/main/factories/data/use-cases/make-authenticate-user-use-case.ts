import { AuthenticateUserUseCase } from '@data/use-cases'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { BcryptAdapter, JwtAdapter } from '@infra/gateways'

export const makeAuthenticateUserUseCase = (): AuthenticateUserUseCase => {
  const userRepository = new MongoUserRepository()
  const hashComparer = new BcryptAdapter()
  const tokenGenerator = new JwtAdapter('any_secret')
  return new AuthenticateUserUseCase(userRepository, hashComparer, tokenGenerator)
}

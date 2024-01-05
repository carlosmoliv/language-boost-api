import { AuthenticateUserUseCase } from '@data/use-cases'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { BcryptAdapter, JwtAdapter } from '@infra/gateways'
import { LoginController } from '@presentation/controllers/auth/login-controller'

export const makeLoginController = (): LoginController => {
  const userRepository = new MongoUserRepository()
  const hashComparer = new BcryptAdapter()
  const tokenGenerator = new JwtAdapter('any_secret')
  const authenticateUser = new AuthenticateUserUseCase(userRepository, hashComparer, tokenGenerator)
  return new LoginController(authenticateUser)
}

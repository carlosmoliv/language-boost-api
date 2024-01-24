import { makeAuthenticateUserUseCase } from '@main/factories/application/use-cases'
import { LoginController } from '@presentation/controllers/auth/login-controller'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthenticateUserUseCase())
}

import { HashComparer, TokenGenerator } from '@data/contracts/gateways'
import { UserRepository } from '@data/contracts/repositories'
import { AccessToken } from '@domain/entities'
import { AuthenticationError } from '@domain/errors'
import { AuthenticateUserUseCase } from '@domain/use-cases'

export class AuthenticateUserUseCaseImp implements AuthenticateUserUseCase {
  constructor (
    private readonly userRepo: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute ({ email, password }: AuthenticateUserUseCase.Input): Promise<AuthenticateUserUseCase.Output> {
    const user = await this.userRepo.findByEmail({ email })
    if (user !== null) {
      const passwordMatch = await this.hashComparer.compare({ plainText: password, digest: user.password })
      if (passwordMatch) {
        const accessToken = await this.tokenGenerator.generate({ key: user.id, expirationInMs: AccessToken.expirationInMs })
        return { accessToken }
      }
    }
    throw new AuthenticationError()
  }
}

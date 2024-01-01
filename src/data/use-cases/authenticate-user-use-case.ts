import { HashComparer, TokenGenerator } from '@data/contracts/gateways'
import { UserRepository } from '@data/contracts/repositories'
import { AccessToken } from '@domain/value-objects'
import { AuthenticationError } from '@domain/errors'

type Input = { email: string, password: string }
type Output = { accessToken: string } | null

export class AuthenticateUserUseCase {
  constructor (
    private readonly userRepo: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute ({ email, password }: Input): Promise<Output> {
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
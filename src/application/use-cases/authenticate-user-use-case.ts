import { HashComparer, TokenGenerator } from '@application/contracts/gateways'
import { UserRepository } from '@application/contracts/repositories'
import { AuthenticationError } from '@application/use-cases/errors'
import { AccessToken } from '@domain/entities'
import { Either, left, right } from '@utils/either'

type Input = { email: string, password: string }
type Output = Either<AuthenticationError, { accessToken: string }>

export class AuthenticateUserUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute ({ email, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByCriteria({ email })
    if (user === null) return left(new AuthenticationError())
    const passwordMatch = await this.hashComparer.compare({ plainText: password, digest: user.password })
    if (!passwordMatch) return left(new AuthenticationError())
    const accessToken = await this.tokenGenerator.generate({ key: user.id, expirationInMs: AccessToken.expirationInMs })
    return right({ accessToken })
  }
}

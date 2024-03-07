import { HashComparer, TokenGenerator } from '@application/contracts/gateways'
import { StudentRepository } from '@application/contracts/repositories'
import { AuthenticationError } from '@application/use-cases/errors'
import { AccessToken } from '@domain/entities'

export class AuthenticateUserUseCase {
  constructor (
    private readonly userRepository: StudentRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute ({ email, password }: AuthenticateUserUseCase.Input): Promise<AuthenticateUserUseCase.Output> {
    const user = await this.userRepository.findByEmail(email)
    if (!user?.id) throw new AuthenticationError()
    const passwordMatch = await this.hashComparer.compare({ plainText: password, digest: user.password })
    if (!passwordMatch) throw new AuthenticationError()
    const accessToken = await this.tokenGenerator.generate({ key: user.id, expirationInMs: AccessToken.expirationInMs })
    return { accessToken }
  }
}

export namespace AuthenticateUserUseCase {
  export type Input = { email: string, password: string }
  export type Output = { accessToken: string }
}

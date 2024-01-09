import { sign } from 'jsonwebtoken'

import { TokenGenerator } from '@application/contracts/gateways'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ expirationInMs, key }: TokenGenerator.Input): Promise<string> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

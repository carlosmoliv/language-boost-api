import { sign } from 'jsonwebtoken'

import { Token } from '@application/contracts/gateways'

export class JwtAdapter implements Token {
  constructor (private readonly secret: string) {}

  async generate (key: string, expirationInMs: number): Promise<string> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

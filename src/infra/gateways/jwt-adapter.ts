import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { Token } from '@application/contracts/gateways'

export class JwtAdapter implements Token {
  constructor (private readonly secret: string) {}

  async generate (key: string, expirationInMs: number): Promise<string> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  validate (token: string): string {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}

import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { Token, TokenPayload } from '@application/contracts/gateways'

export class JwtAdapter implements Token {
  constructor (private readonly secret: string) {}

  async generate<T extends string | Buffer | object>(payload: T, expirationInMs: number): Promise<string> {
    const expirationInSeconds = expirationInMs / 1000
    return sign(payload, this.secret, { expiresIn: expirationInSeconds })
  }

  validate (token: string): TokenPayload {
    const payload = verify(token, this.secret) as JwtPayload
    return { userId: payload.userId, role: payload.role }
  }
}

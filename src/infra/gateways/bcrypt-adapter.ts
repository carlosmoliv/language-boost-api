import { compare } from 'bcrypt'

import { HashComparer } from '@application/contracts/gateways'

export class BcryptAdapter implements HashComparer {
  async compare ({ plainText, digest }: HashComparer.Input): Promise<HashComparer.Output> {
    return compare(plainText, digest)
  }
}

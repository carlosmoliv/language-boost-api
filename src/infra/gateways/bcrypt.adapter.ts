import { compare } from 'bcrypt'

import { HashComparer } from '@data/contracts/gateways'

export class BcryptAdapter implements HashComparer {
  async compare ({ plainText, digest }: HashComparer.Input): Promise<HashComparer.Output> {
    return compare(plainText, digest)
  }
}

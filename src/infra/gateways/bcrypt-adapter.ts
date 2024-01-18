import { compare, hash } from 'bcrypt'

import { HashComparer, Hasher } from '@application/contracts/gateways'

export class BcryptAdapter implements HashComparer, Hasher {
  async compare ({ plainText, digest }: HashComparer.Input): Promise<HashComparer.Output> {
    return compare(plainText, digest)
  }

  async hash ({ plainText }: Hasher.Input): Promise<Hasher.Output> {
    return hash(plainText, 12)
  }
}

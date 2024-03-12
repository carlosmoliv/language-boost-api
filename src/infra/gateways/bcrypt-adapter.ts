import { compare, hash } from 'bcrypt'

import { PasswordHashing } from '@application/contracts/gateways'

export class BcryptAdapter implements PasswordHashing {
  async compare (plainText: string, digest: string): Promise<boolean> {
    return compare(plainText, digest)
  }

  async hash (plainText: string): Promise<string> {
    return hash(plainText, 12)
  }
}

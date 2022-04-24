import bcrypt from 'bcrypt'

import { IHasher } from '../../data/protocols/criptography/hasher'

export class BcryptAdapter implements IHasher {
  constructor (private readonly salt: number) {

  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}

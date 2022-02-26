import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter) {

  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve({ id: 'any_id', name: account.name, email: account.email, password: hashedPassword }))
  }
}

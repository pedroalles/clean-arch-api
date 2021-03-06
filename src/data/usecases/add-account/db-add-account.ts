import { IAccountModel, IAddAccount, IAddAccountModel, IAddAccountRepository, IEncrypter } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter, private readonly addAccountRepository: IAddAccountRepository) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return account
  }
}

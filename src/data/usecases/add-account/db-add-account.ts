import { IAccountModel, IAddAccount, IAddAccountModel, IAddAccountRepository, IEncrypter } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly encrypter: IEncrypter, private readonly addAccountRepository: IAddAccountRepository) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const accountDataWHash = { ...accountData, password: hashedPassword }
    await this.addAccountRepository.add(accountDataWHash)
    return await new Promise(resolve => resolve({ ...accountDataWHash, id: 'any_id' }))
  }
}

import { IAddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { IAccountModel } from '../../../../domain/models/account'
import { IAddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongodb-helper'

export class AccountMongodbRespository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    const id = result.insertedId.toString()

    return {
      id,
      name: accountData.name,
      email: accountData.email,
      password: accountData.password
    }
  }
}

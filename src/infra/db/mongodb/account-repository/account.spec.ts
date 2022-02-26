import { IAccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongodb-helper'
import { AccountMongodbRespository } from './account'

const makeSut = (): AccountMongodbRespository => {
  return new AccountMongodbRespository()
}

describe('Account Mongodb Repository', () => {
  beforeAll(async () => {
    // await MongoHelper.connect(global.__MONGO_URI__)
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return account on success', async () => {
    const sut = makeSut()

    const account: IAccountModel = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})

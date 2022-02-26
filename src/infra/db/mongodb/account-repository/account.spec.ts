import { IAccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongodb-helper'
import { AccountMongodbRespository } from './account'

describe('Account Mongodb Repository', () => {
  beforeAll(async () => {
    // await MongoHelper.connect(global.__MONGO_URI__)
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return account on success', async () => {
    const sut = new AccountMongodbRespository()

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

    expect(1).toBe(1)
  })
})

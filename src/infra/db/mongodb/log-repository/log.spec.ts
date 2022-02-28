import { MongoHelper } from '../helpers/mongodb-helper'
import env from '../../../../main/config/env'
import { Collection } from 'mongodb'
import { LogMongodbRespository } from './log'

describe('Log Mongodb Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('should create an error log on success', async () => {
    const sut = new LogMongodbRespository()

    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})

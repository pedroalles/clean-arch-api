import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongodb-helper'
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/singup')
      .send({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123',
        passwordConfirmation: '123'

      })
      .expect(200)
  })
})

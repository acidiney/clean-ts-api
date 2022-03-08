import request from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  test('should return a account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Acidiney Dias',
        email: 'acidineydias@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect({ ok: 'ok' })
      .expect(200)
  })
})

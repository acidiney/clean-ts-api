import request from 'supertest'
import { app } from '../config/app'

describe('SignUp Routes', () => {
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

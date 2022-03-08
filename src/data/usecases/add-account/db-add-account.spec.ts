import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

describe('DbAddAccount UseCase', function () {
  test('should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (_: string): Promise<string> {
        return 'hashed_value'
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const account = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    await sut.add(account)

    expect(encryptSpy).toHaveBeenCalledWith(account.password)
  })
})

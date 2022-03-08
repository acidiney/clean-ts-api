import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccount } from '../../../domain/usecases/add-account'

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (_: string): Promise<string> {
      return 'hashed_value'
    }
  }

  return new EncrypterStub()
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()

  const sut = new DbAddAccount(encrypterStub)

  return {
    encrypterStub,
    sut
  }
}

describe('DbAddAccount UseCase', function () {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

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

import { LogControllerDecorator } from './log-controller.decorator'
import { Controller, HttpRequest, HttpResponse } from '../presentation/protocols'
import { ok, serverError } from '../presentation/helpers/http-helper'
import { LogErrorRepository } from '../data/protocols/log-error-repository'
import { AccountModel } from '../domain/models/account'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password'
})

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (_: string): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new LogErrorRepositoryStub()
}
const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (_: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: makeFakeAccount(),
        statusCode: 200
      }
      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return { sut, controllerStub, logErrorRepositoryStub }
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()

  fakeError.stack = 'any_stack'

  return serverError(fakeError)
}

describe('LogControllerDecorator', function () {
  it('should call controller handle ', async function () {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return  the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const error = makeFakeServerError()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})

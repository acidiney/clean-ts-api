import { LogControllerDecorator } from './log-controller.decorator'
import { Controller, HttpRequest, HttpResponse } from '../presentation/protocols'

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (_: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: {
          name: 'any_name'
        },
        statusCode: 200
      }
      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

describe('LogControllerDecorator', function () {
  it('should call controller handle ', async function () {
    const controllerStub = makeControllerStub()
    const sut = new LogControllerDecorator(controllerStub)

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})

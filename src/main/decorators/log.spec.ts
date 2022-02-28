import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  it('should call controller.handle', async () => {
    class ControllerStub implements IController {
      async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            name: 'Pedro'
          }
        }
        return await new Promise(resolve => resolve(httpResponse))
      }
    }

    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})

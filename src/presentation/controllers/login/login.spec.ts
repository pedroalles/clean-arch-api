import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { IEmailValidator, IHttpRequest } from '../../protocols'
import { LoginController } from './login'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

interface SutType {
  sut: LoginController
  emailValidatorStub: IEmailValidator
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): Boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isvalidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeRequest())

    expect(isvalidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  it('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

import { InvalidParamError, MissingParamError } from '../../errors'
import { ok, badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { IAuthentication, IController, IEmailValidator, IHttpRequest, IHttpResponse } from './login-protocols'

export class LoginController implements IController {
  constructor (private readonly emailValidator: IEmailValidator, private readonly authentication: IAuthentication) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

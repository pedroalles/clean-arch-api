import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoginController implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return badRequest(new MissingParamError('password'))
    }
    this.emailValidator.isValid(email)
  }
}

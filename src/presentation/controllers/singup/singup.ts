import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { IHttpRequest, IHttpResponse, Controller, IEmailValidator } from '../../protocols'
import { IAddAccount } from '../../../domain/usecases/add-account'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: IEmailValidator, private readonly addAccount: IAddAccount) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      const account = await this.addAccount.add({
        name, email, password
      })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

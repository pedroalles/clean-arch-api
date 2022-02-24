import { BadRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { IEmailValidator } from '../protocols/email-validator'
import { ServerError } from '../errors/server-error'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: IEmailValidator) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return BadRequest(new MissingParamError(field))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return BadRequest(new InvalidParamError('email'))
      return { statusCode: 200, body: {} }
    } catch (error) {
      return { statusCode: 500, body: new ServerError() }
    }
  }
}

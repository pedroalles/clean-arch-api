import { MissingParamError } from '../errors/missing-param-error'
import { BadRequest } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'

export class SingUpController implements Controller {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }

    return { statusCode: 200, body: {} }
  }
}

import { ok, badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { IAuthentication, IController, IHttpRequest, IHttpResponse, IValidation } from './login-protocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { email, password } = httpRequest.body
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

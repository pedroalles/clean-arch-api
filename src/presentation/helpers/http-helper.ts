import { IHttpResponse } from '../protocols/http'

export const BadRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

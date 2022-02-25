import { IHttpRequest, IHttpResponse } from '../protocols/http'

export interface Controller {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}

import { HttpResponse } from '@presentation/interfaces/controller'

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}

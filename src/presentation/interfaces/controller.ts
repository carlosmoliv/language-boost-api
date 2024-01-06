export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}

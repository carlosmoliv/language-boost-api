export type HttpResponse = {
  statusCode: number
  body: any
}

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}

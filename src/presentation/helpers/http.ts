import { HttpResponse } from '@presentation/interfaces'
import { ForbiddenError, ServerError, UnauthorizedError } from '@presentation/errors'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})

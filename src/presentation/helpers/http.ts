import { HttpResponse } from '@presentation/interfaces'
import { ForbiddenError, ServerError, UnauthorizedError } from '@presentation/errors'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error?: Error): HttpResponse => ({
  statusCode: 403,
  body: error ?? new ForbiddenError()
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})

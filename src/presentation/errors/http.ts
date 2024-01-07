export class ServerError extends Error {
  constructor (error?: Error) {
    super('Oops! Looks like something went wrong. Try again later.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access Denied')
    this.name = 'ForbiddenError'
  }
}

export class AuthenticationError extends Error {
  constructor (message = 'Authentication failed') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

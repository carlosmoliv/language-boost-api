export class EmailAlreadyInUseError extends Error {
  constructor (message = 'Email already in use.') {
    super(message)
    this.name = 'EmailAlreadyInUseError'
  }
}

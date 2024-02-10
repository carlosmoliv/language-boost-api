export class StudentNotFoundError extends Error {
  constructor (message = 'The student was not found.') {
    super(message)
    this.name = 'StudentNOtFundError'
  }
}

export class ConnectionNotInitializedError extends Error {
  constructor () {
    super('Connection not initialized')
    this.name = 'ConnectionNotInitialized'
  }
}

export class TransactionNotInitializedError extends Error {
  constructor () {
    super('Transaction not initialized')
    this.name = 'TransactionNotInitialized'
  }
}

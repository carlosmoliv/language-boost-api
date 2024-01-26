import { DbTransaction } from '@presentation/contracts'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class DbTransactionControllerDecorator implements Controller {
  constructor (
    private readonly decoratee: Controller,
    private readonly dbTransaction: DbTransaction
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.dbTransaction.openTransaction()
    try {
      const httpResponse = await this.decoratee.handle(request)
      await this.dbTransaction.commitTransaction()
      return httpResponse
    } catch (error) {
      await this.dbTransaction.rollbackTransaction()
      throw error
    } finally {
      await this.dbTransaction.closeTransaction()
    }
  }
}

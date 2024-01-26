import { makeMongoConnection } from '@main/factories/infra/db/mongo/helpers'
import { DbTransactionControllerDecorator } from '@presentation/decorators'
import { Controller } from '@presentation/interfaces'

export const makeDbTransactionControllerDecorator = (controller: Controller): DbTransactionControllerDecorator =>
  new DbTransactionControllerDecorator(controller, makeMongoConnection())

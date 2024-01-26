import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeRegisterStudentController } from '@main/factories/presentation/controllers'

export default (router: Router): void => {
  router.post('/students', expressRouteAdapter(makeRegisterStudentController()))
}

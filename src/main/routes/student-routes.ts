import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeSignUpStudentController } from '@main/factories/presentation/controllers'

export default (router: Router): void => {
  router.post('/students', expressRouteAdapter(makeSignUpStudentController()))
}

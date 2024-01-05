import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeLoginController } from '@main/factories/presentation/controllers/make-login-controller'

export default (router: Router): void => {
  router.post('/login', expressRouteAdapter(makeLoginController()))
}

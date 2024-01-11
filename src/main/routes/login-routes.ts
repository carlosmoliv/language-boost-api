import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeLoginController } from '@main/factories/presentation/controllers/make-login-controller'
import { validateRequest } from '@main/middlewares'
import { loginSchema } from '@infra/validation/schemas/auth'

export default (router: Router): void => {
  router.post('/login', validateRequest(loginSchema), expressRouteAdapter(makeLoginController()))
}

import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeSignUpStudentController } from '@main/factories/presentation/controllers'
import { validateRequest } from '@main/middlewares'
import { signUpStudentSchema } from '@infra/validation/schemas/student'

export default (router: Router): void => {
  router.post('/students', validateRequest(signUpStudentSchema), expressRouteAdapter(makeSignUpStudentController()))
}

import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeOnboardingStudentController } from '@main/factories/presentation/controllers/make-onboarding-student-controller'
import { validateRequest } from '@main/middlewares'
import { onboardingStudentSchema } from '@infra/validation/schemas/student'

export default (router: Router): void => {
  router.put('/students/:userId/onboarding', validateRequest(onboardingStudentSchema), expressRouteAdapter(makeOnboardingStudentController()))
}

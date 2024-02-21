import { Router } from 'express'

import { expressRouteAdapter } from '@main/adapters/express'
import { makeOnboardingStudentController } from '@main/factories/presentation/controllers/make-onboarding-student-controller'

export default (router: Router): void => {
  router.put('/students/:userId/onboarding', expressRouteAdapter(makeOnboardingStudentController()))
}

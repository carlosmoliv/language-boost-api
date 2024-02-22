import { z } from 'zod'

import { OnboardingSteps } from '@domain/entities'

export const onboardingStudentSchema = z.object({
  onboardingStep: z.nativeEnum(OnboardingSteps)
})

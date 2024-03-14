import { z } from 'zod'

import { OnboardingSteps } from '@domain/entities/student'

export const onboardingStudentSchema = z.object({
  onboardingStep: z.nativeEnum(OnboardingSteps)
})

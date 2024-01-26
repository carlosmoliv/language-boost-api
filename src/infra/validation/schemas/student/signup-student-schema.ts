import { z } from 'zod'

import { SignUpStudentController } from '@presentation/controllers/student'

export const signUpStudentSchema: z.ZodType<SignUpStudentController.Request> = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

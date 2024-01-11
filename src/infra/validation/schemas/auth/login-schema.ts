import { z } from 'zod'

import { LoginController } from '@presentation/controllers/auth'

export const loginSchema: z.ZodType<LoginController.Request> = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

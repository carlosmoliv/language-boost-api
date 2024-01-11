import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validateRequest = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    const errors = error instanceof z.ZodError ? error : undefined
    res.status(400).json({ errors })
  }
}

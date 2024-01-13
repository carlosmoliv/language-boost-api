import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validateRequest = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    const errors = error instanceof z.ZodError ? formatZodError(error) : undefined
    res.status(400).json({ errors })
  }
}

const formatZodError = (error: z.ZodError): Array<{ field: string, message: string }> => {
  const formattedErrors: Array<{ field: string, message: string }> = []
  error.issues.forEach((issue) => formattedErrors.push({ field: issue.path.join('.'), message: issue.message }))
  return formattedErrors
}

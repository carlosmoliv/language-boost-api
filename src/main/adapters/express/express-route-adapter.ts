import { Request, Response } from 'express'

import { Controller } from '@presentation/interfaces'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      userId: req.userId
    }
    const { body, statusCode } = await controller.handle(request)
    if (statusCode >= 200 && statusCode <= 299) {
      res.status(statusCode).json(body)
    } else {
      res.status(statusCode).json({ error: body.message })
    }
  }
}

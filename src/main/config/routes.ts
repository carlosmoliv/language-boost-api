import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, '../routes'))
    .filter((file: string) => !file.endsWith('.map'))
    .map(async (file: string) => {
      (await import(`../routes/${file}`)).default(router)
    })
  app.use('/api', router)
}

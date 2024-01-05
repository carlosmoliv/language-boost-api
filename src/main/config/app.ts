import express from 'express'

import { setupMiddlewares } from '@main/config/middlewares'

const app = express()
setupMiddlewares(app)
export { app }

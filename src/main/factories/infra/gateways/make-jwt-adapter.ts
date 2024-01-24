import { env } from '@main/config/env'
import { JwtAdapter } from '@infra/gateways'

export const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(env.jwt.secret)

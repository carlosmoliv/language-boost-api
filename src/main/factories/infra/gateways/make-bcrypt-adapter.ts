import { BcryptAdapter } from '@infra/gateways'

export const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter()

import { AccessToken } from '../../../src/common'

describe('AccessToken', () => {
  test('Expiration time of 30 minutes', async () => {
    expect(AccessToken.expirationInMs).toBe(30 * 60 * 1000)
  })
})

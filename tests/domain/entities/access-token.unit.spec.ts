import { AccessToken } from '@domain/entities'

describe('AccessToken', () => {
  it('should have an expiration time of 30 minutes', async () => {
    expect(AccessToken.expirationInMs).toBe(30 * 60 * 1000)
  })
})

import { BaseUser } from '@domain/entities'

class UserStub extends BaseUser {}

describe('BaseUser', () => {
  let sut: UserStub

  beforeEach(() => {
    sut = new UserStub('any_name', 'any_email@mail.com', 'any_password')
  })

  it('should return true if Student is verified', async () => {
    sut.verify(new Date())

    expect(sut.isVerified()).toBe(true)
  })

  it('should return false if Student is not verified', async () => {
    expect(sut.isVerified()).toBe(false)
  })

  it('should set role to Student as default if no role is passed', async () => {
    expect(sut.role).toBe('student')
  })

  it('should set status to pending', async () => {
    expect(sut.status).toBe('pending')
  })
})

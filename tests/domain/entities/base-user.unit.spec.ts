import { BaseUser, UserRoles, UserStatus } from '@domain/entities'

class UserStub extends BaseUser {}

describe('BaseUser', () => {
  let sut: UserStub

  beforeEach(() => {
    sut = new UserStub('any_name', 'any_email@mail.com', 'any_password')
  })

  it('should return true if User is verified', async () => {
    sut.verify(new Date())

    expect(sut.isVerified()).toBe(true)
  })

  it('should return false if User is not verified', async () => {
    expect(sut.isVerified()).toBe(false)
  })

  it('should set role to Student as default when no role is provided', async () => {
    expect(sut.role).toBe(UserRoles.Student)
  })

  it('should set status to pending', async () => {
    expect(sut.status).toBe(UserStatus.Pending)
  })
})

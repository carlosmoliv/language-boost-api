import { BaseUser, UserRoles, UserStatus } from '@domain/entities'

class UserStub extends BaseUser {}

describe('BaseUser', () => {
  let sut: UserStub

  beforeEach(() => {
    sut = new UserStub({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Confirm that the User is verified', async () => {
    sut.verify(new Date())

    expect(sut.isVerified()).toBe(true)
  })

  test('Confirm that the User is not verified', async () => {
    expect(sut.isVerified()).toBe(false)
  })

  test('Default role is Student', async () => {
    expect(sut.role).toBe(UserRoles.Student)
  })

  test('Default status is Pending', async () => {
    expect(sut.status).toBe(UserStatus.Pending)
  })
})

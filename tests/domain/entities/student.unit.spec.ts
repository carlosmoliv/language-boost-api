import { Student } from '@domain/entities'

describe('Student', () => {
  let sut: Student

  it('should return true if Student is verified', async () => {
    sut = new Student('any_name', 'any_email', 'any_password', 'active', new Date())

    expect(sut.isVerified()).toBe(true)
  })

  it('should return false if Student is not verified', async () => {
    sut = new Student('any_name', 'any_email', 'any_password', 'active', null)

    expect(sut.isVerified()).toBe(false)
  })
})

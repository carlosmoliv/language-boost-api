import { OnboardingSteps, Student } from '@domain/entities/student'

describe('Student', () => {
  let sut: Student

  beforeEach(() => {
    sut = Student.create({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })
  })

  test.each([Object.values(OnboardingSteps)])('Mark step %s as complete', async (step) => {
    sut.markOnboardingStep(step)

    expect(sut.onboarding[step]).toBe(true)
  })
})

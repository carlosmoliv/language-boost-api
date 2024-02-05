import { Onboarding, OnboardingSteps, Student } from '@domain/entities'

describe('Student', () => {
  let sut: Student

  beforeEach(() => {
    sut = new Student('any_name', 'any_email@mail.com', 'any_password', new Onboarding())
  })

  test.each([Object.values(OnboardingSteps)])('Mark step %s as complete', async (step) => {
    sut.markOnboardingStep(step)

    expect(sut.onboarding[step]).toBe(true)
  })
})

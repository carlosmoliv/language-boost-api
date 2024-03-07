import { OnboardingSteps, Student } from '@domain/entities'

describe('Student', () => {
  let sut: Student

  beforeEach(() => {
    sut = new Student({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })
  })

  test.each([Object.values(OnboardingSteps)])('Mark step %s as complete', async (step) => {
    sut.markOnboardingStep(step)

    expect(sut.onboarding[step]).toBe(true)
  })

  test('Not a valid step', () => {
    const performingInvalidStep = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      sut.markOnboardingStep('invalid_step' as any)
    }

    expect(performingInvalidStep).toThrow()
  })
})

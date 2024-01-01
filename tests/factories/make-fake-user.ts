import { faker } from '@faker-js/faker'

type Output = { name: string, email: string, password: string }

export const makeFakeUser = (): Output => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

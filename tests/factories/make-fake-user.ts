import { faker } from '@faker-js/faker'

import { UserRoles } from '@domain/entities'

type Input = { role?: UserRoles }
type Output = { name: string, email: string, password: string, role: UserRoles }

export const makeFakeUser = ({ role = UserRoles.Student }: Input = {}): Output => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role
})

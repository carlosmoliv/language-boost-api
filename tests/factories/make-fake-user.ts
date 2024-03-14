import { faker } from '@faker-js/faker'

import { UserRoles } from '@domain/entities/base-user'
import { Student } from '@domain/entities/student'

type Input = { role?: UserRoles, id?: string }

export const makeFakeUser = ({ role = UserRoles.Student, id }: Input = {}): Student => {
  const data = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role,
    id
  }
  return Student.create(data)
}

import { makeFakeUser } from '@tests/factories'
import { MongoStudentModel, MongoUserModel } from '@infra/db/mongo/models'
import { StudentData } from '@domain/entities'
import { StudentMap } from '@infra/db/mongo/helpers/mappers'

export const makeCreateFakeStudentOnDatabase = async (): Promise<StudentData> => {
  const student = await MongoStudentModel.create({})
  const user = await MongoUserModel.create({ ...makeFakeUser(), student: student.id })
  return StudentMap.toDomain(user)
}

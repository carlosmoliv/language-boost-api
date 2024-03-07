import { makeFakeUser } from '@tests/factories'
import { MongoStudentModel, MongoUserModel } from '@infra/db/mongo/models'
import { StudentMap } from '@infra/db/mongo/helpers/mappers'

export const makeCreateFakeStudentOnDatabase = async (): Promise<any> => {
  const { user, student } = StudentMap.toPersistance(makeFakeUser())
  const result = await MongoStudentModel.create(student)
  return MongoUserModel.create({ ...user, student: result.id })
}

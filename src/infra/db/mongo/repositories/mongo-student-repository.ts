import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'

export class MongoStudentRepository {
  async findByEmail ({ email }: StudentRepository.FindByEmailInput): Promise<any> {
    const student = await MongoUserModel.findOne({ email }).populate('student').exec()
    return student
  }

  async create (input: StudentRepository.CreateInput): Promise<void> {
    const student = await MongoStudentModel.create({})
    await MongoUserModel.create({ ...input, student: student.id })
  }
}

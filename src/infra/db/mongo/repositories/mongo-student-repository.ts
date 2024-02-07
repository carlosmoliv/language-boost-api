import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'
import { MongoHelper } from '@infra/db/mongo/helpers'

export class MongoStudentRepository implements StudentRepository {
  async findByEmail ({ email }: StudentRepository.FindByEmailInput): Promise<StudentRepository.FindByEmailOutput> {
    const student = await MongoUserModel.findOne({ email }).populate('student')
    return student && MongoHelper.map(student.toObject())
  }

  async create ({ onboarding, ...userData }: StudentRepository.CreateInput): Promise<void> {
    const student = await MongoStudentModel.create({ onboarding })
    await MongoUserModel.create({ ...userData, student: student.id })
  }
}

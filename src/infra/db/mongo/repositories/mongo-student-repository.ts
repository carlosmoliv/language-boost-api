import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import mongoose from 'mongoose'

export class MongoStudentRepository implements StudentRepository {
  async create ({ onboarding, id, ...userData }: StudentRepository.CreateInput): Promise<void> {
    const student = await MongoStudentModel.create({ onboarding })
    await MongoUserModel.create({ ...userData, _id: id, student: student.id })
  }

  async findByEmail ({ email }: StudentRepository.FindByEmailInput): Promise<StudentRepository.FindByEmailOutput> {
    const student = await MongoUserModel.findOne({ email }).populate('student')
    return student && MongoHelper.map(student.toObject())
  }

  async findById ({ id }: StudentRepository.FindByIdInput): Promise<StudentRepository.FindByEmailOutput> {
    const student = await MongoUserModel.findById(new mongoose.Types.ObjectId(id)).populate('student')
    return student && MongoHelper.map(student.toObject())
  }
}

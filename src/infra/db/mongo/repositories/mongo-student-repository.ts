import mongoose from 'mongoose'

import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { StudentMap } from '@infra/db/mongo/helpers/mappers'

export class MongoStudentRepository implements StudentRepository {
  async create ({ onboarding, id, ...userData }: StudentRepository.CreateInput): Promise<void> {
    const student = await MongoStudentModel.create({ onboarding })
    await MongoUserModel.create({ ...userData, _id: id, student: student.id })
  }

  async save ({ email, id, name, password, ...studentData }: StudentRepository.SaveInput): Promise<void> {
    const user = await MongoUserModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { name, email, password })
    if (user) await MongoStudentModel.updateOne({ _id: user.student }, { ...studentData })
  }

  async findByEmail (email: string): Promise<StudentRepository.FindOutput> {
    const student = await MongoUserModel.findOne({ email }).populate('student')
    return student && MongoHelper.map(student.toObject())
  }

  async findById (id: string): Promise<StudentRepository.FindOutput> {
    const student = await MongoUserModel.findById(new mongoose.Types.ObjectId(id)).populate('student')
    return student && StudentMap.toDomain(student.toObject())
  }
}

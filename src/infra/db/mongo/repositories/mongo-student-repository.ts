import mongoose from 'mongoose'

import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { StudentMap } from '@infra/db/mongo/helpers/mappers'

export class MongoStudentRepository implements StudentRepository {
  async create (input: StudentRepository.CreateInput): Promise<void> {
    const { student, ...userData } = StudentMap.toPersistance(input)
    const result = await MongoStudentModel.create(student)
    await MongoUserModel.create({ ...userData, student: result.id })
  }

  async update (input: StudentRepository.UpdateInput): Promise<void> {
    const { student, ...userData } = StudentMap.toPersistance(input)
    const updatedUser = await MongoUserModel.findByIdAndUpdate(userData._id, { ...userData }, { new: true })
    if (updatedUser) await MongoStudentModel.updateOne({ _id: updatedUser.student }, { student })
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

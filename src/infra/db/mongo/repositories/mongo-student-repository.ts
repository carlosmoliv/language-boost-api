import mongoose from 'mongoose'

import { MongoUserModel, MongoStudentModel } from '@infra/db/mongo/models'
import { StudentRepository } from '@application/contracts/repositories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { StudentMap } from '@infra/db/mongo/helpers/mappers'
import { Student } from '@domain/entities'

export class MongoStudentRepository implements StudentRepository {
  async create (student: Student): Promise<void> {
    const { student: studentData, ...userData } = StudentMap.toPersistence(student)
    const result = await MongoStudentModel.create(studentData)
    await MongoUserModel.create({ ...userData, student: result.id })
  }

  async update (student: Student): Promise<void> {
    const { student: studentData, ...userData } = StudentMap.toPersistence(student)
    const updatedUser = await MongoUserModel.findByIdAndUpdate(userData._id, { ...userData }, { new: true })
    if (updatedUser) await MongoStudentModel.findByIdAndUpdate(updatedUser.student, { ...studentData })
  }

  async findByEmail (email: string): Promise<Student | null> {
    const student = await MongoUserModel.findOne({ email }).populate('student')
    return student && MongoHelper.map(student.toObject())
  }

  async findById (id: string): Promise<Student | null> {
    const student = await MongoUserModel.findById(new mongoose.Types.ObjectId(id)).populate('student')
    return student && StudentMap.toDomain(student.toObject())
  }
}

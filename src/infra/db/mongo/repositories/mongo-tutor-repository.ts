import { MongoUserModel } from '@infra/db/mongo/models'
import { Tutor } from '@domain/entities/tutor'
import { TutorRepository } from '@application/contracts/repositories/tutor-repository'
import { StudentMap, TutorMapper } from '@infra/db/mongo/helpers/mappers'
import { MongoTutorModel } from '@infra/db/mongo/models/mongo-tutor-model'
import { Student } from '@domain/entities/student'

export class MongoTutorRepository implements TutorRepository {
  async create (tutor: Tutor): Promise<void> {
    const { tutor: tutorData, ...userData } = TutorMapper.toPersistence(tutor)
    const result = await MongoTutorModel.create(tutorData)
    await MongoUserModel.create({ ...userData, tutor: result.id })
  }

  async findByEmail (email: string): Promise<Student | null> {
    const student = await MongoUserModel.findOne({ email }).populate('student')
    return student && StudentMap.toDomain(student.toObject())
  }
}

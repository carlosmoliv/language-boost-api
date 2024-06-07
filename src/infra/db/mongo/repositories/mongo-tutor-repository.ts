import { MongoUserModel } from '@infra/db/mongo/models'
import { Tutor } from '@domain/entities/tutor'
import { TutorRepository } from '@application/contracts/repositories/tutor-repository'
import { TutorMapper } from '@infra/db/mongo/helpers/mappers'
import { MongoTutorModel } from '@infra/db/mongo/models/mongo-tutor-model'

export class MongoTutorRepository implements TutorRepository {
  async create (tutor: Tutor): Promise<void> {
    const { tutor: tutorData, ...userData } = TutorMapper.toPersistence(tutor)
    const result = await MongoTutorModel.create(tutorData)
    await MongoUserModel.create({ ...userData, tutor: result.id })
  }
}

import { Student } from '@domain/entities'

export interface StudentRepository {
  create: (student: Student) => Promise<void>
  update: (student: Student) => Promise<void>
  findByEmail: (email: string) => Promise<Student | null>
  findById: (id: string) => Promise<Student | null>
}

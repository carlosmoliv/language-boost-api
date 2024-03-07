import { UserRoles, UserStatus } from '@domain/entities'

export type UserProps = {
  name: string
  email: string
  password: string
  role?: UserRoles
  status?: UserStatus
  verifiedAt?: Date | null
  id?: string
}

export abstract class BaseUser {
  private _name: string
  private _email: string
  private _password: string
  private _status: UserStatus
  private _verifiedAt: Date | null
  private _role: UserRoles
  private _id?: string

  constructor ({
    name,
    email,
    password,
    status,
    verifiedAt,
    role,
    id
  }: UserProps) {
    this._name = name
    this._email = email
    this._password = password
    this._status = status ?? UserStatus.Pending
    this._verifiedAt = verifiedAt ?? null
    this._role = role ?? UserRoles.Student
    this._id = id
  }

  public get name (): string {
    return this._name
  }

  public set name (name: string) {
    this._name = name
  }

  public get email (): string {
    return this._email
  }

  public set email (email: string) {
    this._email = email
  }

  public get password (): string {
    return this._password
  }

  public set password (password: string) {
    this._password = password
  }

  public get status (): UserStatus {
    return this._status
  }

  public set status (status: UserStatus) {
    this._status = status
  }

  public get verifiedAt (): Date | null {
    return this._verifiedAt
  }

  public set verifiedAt (verifiedAt: Date | null) {
    this._verifiedAt = verifiedAt
  }

  public get role (): UserRoles {
    return this._role
  }

  public set role (role: UserRoles) {
    this._role = role
  }

  public get id (): string | undefined {
    return this._id
  }

  public set id (id: string) {
    this._id = id
  }

  public isVerified (): boolean {
    return !!this._verifiedAt
  }

  public verify (date: Date): void {
    this._verifiedAt = date
  }
}

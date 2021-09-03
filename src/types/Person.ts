import { ObjectId } from 'mongoose'

export type Person = {
  _id: ObjectId
  name: string
  age: number
  bloodType: string
  skills: string
  isInjured: boolean
  isInfected: boolean
  canWork: boolean
  observation: string
  createdAt: Date
  isLoading: boolean
}

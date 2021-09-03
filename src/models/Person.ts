import { Schema, Model, models, model } from 'mongoose'
import { Person } from 'types/Person'

const personSchema = new Schema<Person>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
    maxlenght: 3,
  },
  skills: {
    type: String,
    required: true,
  },
  isInjured: {
    type: Boolean,
    required: true,
  },
  isInfected: {
    type: Boolean,
    required: true,
  },
  canWork: {
    type: Boolean,
    required: true,
  },
  observation: {
    type: String,
    required: false,
    maxlength: 244,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

export const PersonModel =
  (models.Person as Model<Person>) || model<Person>('Person', personSchema)

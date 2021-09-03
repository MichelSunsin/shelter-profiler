import { Person } from 'types/Person'

export type Response = {
  success: boolean
  data?: Person | Person[]
}

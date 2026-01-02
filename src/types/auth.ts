import type { User } from './users'

export interface LoginPayload {
  email: string
  password: string
}

export interface Response {
  accessToken: string
  user: User
}


export interface LoginErrors {
  email?: string
  password?: string
  form?: string
}

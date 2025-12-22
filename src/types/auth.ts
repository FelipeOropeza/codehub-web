import type { UserProfile } from './users'

export interface LoginPayload {
  email: string
  password: string
}

export interface Response {
  accessToken: string
  user: UserProfile
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
}

export interface Response {
  message: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  bio?: string
  avatarUrl?: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
}

export interface Response {
  message: string
}

export interface User {
  id: string
  email: string
  name: string
  bio?: string
  avatar?: string
}

export interface UpdateProfilePayload {
  name?: string
  bio?: string
  avatar?: string
  email?: string
}

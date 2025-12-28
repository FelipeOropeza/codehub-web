import api from './api'
import type { RegisterPayload, Response, UpdateProfilePayload, User } from '@/types/users'

export const userApi = {
  register(payload: RegisterPayload) {
    return api.post<Response>('/users/register', payload)
  },

  updateProfile(payload: UpdateProfilePayload) {
    return api.patch<User>('/users/me', payload)
  }
}

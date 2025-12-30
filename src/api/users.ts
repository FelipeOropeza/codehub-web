import api from './api'
import type { RegisterPayload, Response, UpdateProfilePayload, User } from '@/types/users'

export const userApi = {
  register(payload: RegisterPayload) {
    return api.post<Response>('/users/register', payload)
  },

  updateProfile(payload: FormData) {
    return api.patch<User>('/users/me', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  getById(userId: string) {
    return api.get<User>(`/users/${userId}`)
  },
}

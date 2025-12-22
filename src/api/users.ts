import api from './api'
import type { RegisterPayload, Response } from '@/types/users'

export const userApi = {
  register(payload: RegisterPayload) {
    return api.post<Response>('/users/register', payload)
  }
}

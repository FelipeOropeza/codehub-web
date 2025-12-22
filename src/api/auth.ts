import api from "./api"
import type { LoginPayload, Response } from "@/types/auth"

export const authApi = {
  login(payload: LoginPayload) {
    return api.post<Response>('/auth/login', payload)
  }
}

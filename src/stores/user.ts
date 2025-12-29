import { defineStore } from 'pinia'
import { userApi } from '@/api/users'
import type { Response, RegisterPayload, UpdateProfilePayload, User } from '@/types/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    user: null as User | null,
  }),

  actions: {
    async register(payload: RegisterPayload): Promise<Response> {
      this.loading = true
      try {
        const res = await userApi.register(payload)
        return res.data
      } finally {
        this.loading = false
      }
    },

    async updateProfile(payload: FormData) {
      const { data } = await userApi.updateProfile(payload)
      this.user = data
      localStorage.setItem('user', JSON.stringify(data))
    },
  },
})

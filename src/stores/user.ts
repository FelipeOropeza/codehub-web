import { defineStore } from 'pinia'
import { userApi } from '@/api/users'
import type { Response, RegisterPayload } from '@/types/users'


export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
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
  },
})

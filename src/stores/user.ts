import { defineStore } from 'pinia'
import { userApi } from '@/api/users'
import type { User, RegisterPayload, Response } from '@/types/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,

    user: null as User | null,

    viewedUser: null as User | null,
  }),

  actions: {
    async updateProfile(payload: FormData): Promise<User> {
      this.loading = true
      try {
        const { data } = await userApi.updateProfile(payload)
        this.user = data
        return data
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload): Promise<Response> {
      this.loading = true
      try {
        const res = await userApi.register(payload)
        return res.data
      } finally {
        this.loading = false
      }
    },

    async fetchUserById(userId: string): Promise<User> {
      this.loading = true
      try {
        const { data } = await userApi.getById(userId)
        this.viewedUser = data
        return data
      } finally {
        this.loading = false
      }
    },

    clearViewedUser() {
      this.viewedUser = null
    },
  },
})

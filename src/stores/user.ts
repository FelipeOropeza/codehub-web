import { defineStore } from 'pinia'
import { userApi } from '@/api/users'
import type { User, RegisterPayload, Response, RegisterErrors } from '@/types/users'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    user: null as User | null,
    viewedUser: null as User | null,
    errors: {} as RegisterErrors,
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

    async register(payload: { name: string; email: string; password: string }) {
      this.loading = true
      this.errors = {}

      try {
        const { data } = await userApi.register(payload)
        return data
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const messages = err.response?.data?.message

          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              if (msg.toLowerCase().includes('nome')) {
                this.errors.name = msg
              }
              if (msg.toLowerCase().includes('email')) {
                this.errors.email = msg
              }
              if (msg.toLowerCase().includes('senha')) {
                this.errors.password = msg
              }
            })
          } else {
            this.errors.form = 'Erro ao criar conta'
          }
        } else {
          this.errors.form = 'Erro inesperado'
        }

        throw err
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

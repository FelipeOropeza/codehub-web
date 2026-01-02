import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import axios from 'axios'
import type { User } from '@/types/users'

interface LoginErrors {
  email?: string
  password?: string
  form?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: null as User | null,
    loading: false,
    errors: {} as LoginErrors,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(payload: { email: string; password: string }) {
      this.loading = true
      this.errors = {}

      try {
        const { data } = await authApi.login(payload)

        this.token = data.accessToken
        this.user = data.user

        localStorage.setItem('token', data.accessToken)

        return data
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.message

          if (Array.isArray(message)) {
            message.forEach((msg: string) => {
              if (msg.toLowerCase().includes('email')) {
                this.errors.email = msg
              }
              if (msg.toLowerCase().includes('senha')) {
                this.errors.password = msg
              }
            })
          } else if (typeof message === 'string') {
            this.errors.form = message
          } else {
            this.errors.form = 'Erro ao fazer login'
          }
        } else {
          this.errors.form = 'Erro inesperado'
        }

        throw err
      } finally {
        this.loading = false
      }
    },

    async loadUser() {
      if (!this.token || this.user) return

      this.loading = true
      try {
        const { data } = await authApi.me()
        this.user = data
      } finally {
        this.loading = false
      }
    },

    updateUser(user: User) {
      this.user = user
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})

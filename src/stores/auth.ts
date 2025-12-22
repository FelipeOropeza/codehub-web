import { defineStore } from 'pinia'
import type { UserProfile } from '@/types/users'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: JSON.parse(localStorage.getItem('user') || 'null') as UserProfile | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

   actions: {
    login(token: string, user: UserProfile) {
      this.token = token
      this.user = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

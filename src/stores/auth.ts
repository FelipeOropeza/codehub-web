import { defineStore } from 'pinia'

type User = {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    login(user: User) {
      this.user = user
    },

    logout() {
      this.user = null
    },
  },
})

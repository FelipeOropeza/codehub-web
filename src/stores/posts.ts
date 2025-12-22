import { defineStore } from 'pinia'
import { postsApi } from '@/api/posts'
import type { Post } from '@/types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await postsApi.fetchPosts()
        this.posts = response.data
      } finally {
        this.loading = false
      }
    },
  },
})

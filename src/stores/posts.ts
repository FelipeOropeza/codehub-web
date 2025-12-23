import { defineStore } from 'pinia'
import { postsApi } from '@/api/posts'
import type { Post, CreatePostPayload } from '@/types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    creating: false,
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

    async createPost(payload: CreatePostPayload) {
      this.creating = true
      try {
        const response = await postsApi.createPost(payload)

        console.log('Post created:', response.data)
        return response.data
      } finally {
        this.creating = false
      }
    },
  },
})

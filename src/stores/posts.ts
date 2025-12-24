import { defineStore } from 'pinia'
import { postsApi } from '@/api/posts'
import type { CreatePostPayload, PostWithAuthor } from '@/types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as PostWithAuthor[],
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

        this.posts.unshift(response.data)

        return response.data
      } finally {
        this.creating = false
      }
    },
  },
})

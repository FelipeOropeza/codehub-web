import { defineStore } from 'pinia'
import { commentsApi } from '@/api/comments'
import type { Comment, CreateCommentPayload } from '@/types/comments'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as Comment[],
    loading: false,
    creating: false,
  }),

  actions: {
    async createComment(payload: CreateCommentPayload) {
      this.creating = true
      try {
        const response = await commentsApi.create(payload)
        this.comments.push(response.data)
        return response.data
      } finally {
        this.creating = false
      }
    },

    async deleteComment(commentId: string) {
      await commentsApi.delete(commentId)
      this.comments = this.comments.filter(c => c.id !== commentId)
    },

    async fetchCommentsByPost(postId: string) {
      this.loading = true
      try {
        const response = await commentsApi.fetchByPost(postId)
        this.comments = response.data
      } finally {
        this.loading = false
      }
    },
  },
})

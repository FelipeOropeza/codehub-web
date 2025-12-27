import api from './api'
import type { Comment, CreateCommentPayload } from '@/types/comments'

export const commentsApi = {
  fetchByPost(postId: string) {
    return api.get<Comment[]>(`/comments/${postId}`)
  },

  create(payload: CreateCommentPayload) {
    return api.post<Comment>('/comments', payload)
  },

  delete(commentId: string) {
    return api.delete(`/comments/${commentId}`)
  },
}

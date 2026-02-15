import api from './api'
import type { CreatePostPayload, PostWithAuthor } from '@/types/posts'

export const postsApi = {
  fetchPosts({ page = 1 }: { page: number }) {
    return api.get<PostWithAuthor[]>(`/posts?page=${page}&limit=10`)
  },

  fetchPostsByUser(userId: string) {
    return api.get<PostWithAuthor[]>(`/posts/user/${userId}`)
  },

  createPost(payload: CreatePostPayload) {
    return api.post<PostWithAuthor>('/posts/create', payload)
  },

  toggleLike(postId: string) {
    return api.post<{ liked: boolean }>(`/likes/${postId}`)
  },

  fetchPostById(id: string) {
    return api.get<PostWithAuthor>(`/posts/${id}`)
  },
}

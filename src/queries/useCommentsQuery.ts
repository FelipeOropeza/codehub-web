import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { commentsApi } from '@/api/comments'
import type { CreateCommentPayload } from '@/types/comments'

export const commentsKeys = {
  all: ['comments'] as const,
  byPost: (postId: string) => [...commentsKeys.all, postId] as const,
}

/* ===============================
   FETCH COMMENTS
================================ */
export function useCommentsByPost(postId: string) {
  return useQuery({
    queryKey: commentsKeys.byPost(postId),
    queryFn: async () => {
      const { data } = await commentsApi.fetchByPost(postId)
      return data
    },
    enabled: !!postId,
  })
}

/* ===============================
   CREATE COMMENT
================================ */
export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) =>
      commentsApi.create(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys.byPost(variables.postId),
      })
    },
  })
}

/* ===============================
   DELETE COMMENT
================================ */
export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: string) =>
      commentsApi.delete(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys.byPost(postId),
      })
    },
  })
}

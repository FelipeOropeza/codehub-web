import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { followsApi } from '@/api/follows'

/* ===============================
   QUERY KEYS
================================ */
const FOLLOW_STATUS_KEY = (userId: string) => ['follow-status', userId]
const FOLLOW_COUNTS_KEY = (userId: string) => ['follow-counts', userId]

/* ===============================
   IS FOLLOWING?
================================ */
export function useIsFollowing(userId: string) {
  return useQuery<boolean>({
    queryKey: FOLLOW_STATUS_KEY(userId),
    queryFn: async () => {
      const { data } = await followsApi.isFollowing(userId)
      return data
    },
    enabled: !!userId,
  })
}

/* ===============================
   FOLLOW COUNTS
================================ */
export function useFollowCounts(userId: string) {
  return useQuery({
    queryKey: FOLLOW_COUNTS_KEY(userId),
    queryFn: async () => {
      const [followers, following] = await Promise.all([
        followsApi.followers(userId),
        followsApi.following(userId),
      ])

      return {
        followers: followers.data.length,
        following: following.data.length,
      }
    },
    enabled: !!userId,
  })
}

/* ===============================
   FOLLOW
================================ */
export function useFollowUser(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => followsApi.follow(userId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: FOLLOW_STATUS_KEY(userId) })
      await queryClient.cancelQueries({ queryKey: FOLLOW_COUNTS_KEY(userId) })

      const previousStatus =
        queryClient.getQueryData<boolean>(FOLLOW_STATUS_KEY(userId))
      const previousCounts =
        queryClient.getQueryData<{ followers: number; following: number }>(
          FOLLOW_COUNTS_KEY(userId),
        )

      queryClient.setQueryData(FOLLOW_STATUS_KEY(userId), true)

      if (previousCounts) {
        queryClient.setQueryData(FOLLOW_COUNTS_KEY(userId), {
          ...previousCounts,
          followers: previousCounts.followers + 1,
        })
      }

      return { previousStatus, previousCounts }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousStatus !== undefined) {
        queryClient.setQueryData(
          FOLLOW_STATUS_KEY(userId),
          ctx.previousStatus,
        )
      }

      if (ctx?.previousCounts) {
        queryClient.setQueryData(
          FOLLOW_COUNTS_KEY(userId),
          ctx.previousCounts,
        )
      }
    },
  })
}

/* ===============================
   UNFOLLOW
================================ */
export function useUnfollowUser(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => followsApi.unfollow(userId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: FOLLOW_STATUS_KEY(userId) })
      await queryClient.cancelQueries({ queryKey: FOLLOW_COUNTS_KEY(userId) })

      const previousStatus =
        queryClient.getQueryData<boolean>(FOLLOW_STATUS_KEY(userId))
      const previousCounts =
        queryClient.getQueryData<{ followers: number; following: number }>(
          FOLLOW_COUNTS_KEY(userId),
        )

      queryClient.setQueryData(FOLLOW_STATUS_KEY(userId), false)

      if (previousCounts) {
        queryClient.setQueryData(FOLLOW_COUNTS_KEY(userId), {
          ...previousCounts,
          followers: previousCounts.followers - 1,
        })
      }

      return { previousStatus, previousCounts }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousStatus !== undefined) {
        queryClient.setQueryData(
          FOLLOW_STATUS_KEY(userId),
          ctx.previousStatus,
        )
      }

      if (ctx?.previousCounts) {
        queryClient.setQueryData(
          FOLLOW_COUNTS_KEY(userId),
          ctx.previousCounts,
        )
      }
    },
  })
}

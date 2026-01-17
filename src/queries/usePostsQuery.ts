import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { postsApi } from '@/api/posts'
import type { CreatePostPayload, PostWithAuthor } from '@/types/posts'

/* ===============================
   QUERY KEYS
================================ */
const POSTS_KEY = ['posts']
const POST_KEY = (id: string) => ['post', id]
const USER_POSTS_KEY = (userId: string) => ['user-posts', userId]

/* ===============================
   FEED
================================ */
export function usePosts() {
  return useQuery<PostWithAuthor[]>({
    queryKey: POSTS_KEY,
    queryFn: async () => {
      const { data } = await postsApi.fetchPosts()
      return data.map((post) => ({
        ...post,
        likedByMe: post.likedByMe ?? false,
      }))
    },
  })
}

/* ===============================
   POST INDIVIDUAL
================================ */
export function usePost(postId: string) {
  return useQuery<PostWithAuthor>({
    queryKey: POST_KEY(postId),
    queryFn: async () => {
      const { data } = await postsApi.fetchPostById(postId)
      data.likedByMe = Array.isArray(data.likes) && data.likes.length > 0
      return data
    },
    enabled: !!postId,
  })
}

/* ===============================
   POSTS DO USUÁRIO
================================ */
export function usePostsByUser(userId: string) {
  return useQuery<PostWithAuthor[]>({
    queryKey: USER_POSTS_KEY(userId),
    queryFn: async () => {
      const { data } = await postsApi.fetchPostsByUser(userId)
      return data.map((post) => ({
        ...post,
        likedByMe: post.likedByMe ?? false,
      }))
    },
    enabled: !!userId,
  })
}

/* ===============================
   CREATE POST
================================ */
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      postsApi.createPost(payload).then((res) => res.data),

    onSuccess: (newPost) => {
      queryClient.setQueryData<PostWithAuthor[]>(POSTS_KEY, (old) => {
        if (!old) return [{ ...newPost, likedByMe: false }]
        return [{ ...newPost, likedByMe: false }, ...old]
      })
    },
  })
}

/* ===============================
   TOGGLE LIKE
================================ */
export function useToggleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) =>
      postsApi.toggleLike(postId).then((res) => res.data),

    onSuccess: (data, postId) => {
      const update = (posts?: PostWithAuthor[]) =>
        posts?.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByMe: data.liked,
                _count: {
                  ...post._count,
                  likes: post._count.likes + (data.liked ? 1 : -1),
                },
              }
            : post
        )

      queryClient.setQueryData<PostWithAuthor[]>(POSTS_KEY, update)

      queryClient.setQueriesData<PostWithAuthor[]>(
        { queryKey: ['user-posts'] },
        update
      )

      queryClient.setQueryData<PostWithAuthor>(
        ['post', postId],
        (post) =>
          post
            ? {
                ...post,
                likedByMe: data.liked,
                _count: {
                  ...post._count,
                  likes: post._count.likes + (data.liked ? 1 : -1),
                },
              }
            : post
      )
    },
  })
}

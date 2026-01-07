import { defineStore } from 'pinia'
import { postsApi } from '@/api/posts'
import type { CreatePostPayload, PostWithAuthor } from '@/types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as PostWithAuthor[],
    postsUser: [] as PostWithAuthor[],

    currentPost: null as PostWithAuthor | null,
    currentPostId: null as PostWithAuthor | null,

    loadingFeed: false,
    loadingPost: false,
    creating: false,
  }),

  actions: {
    async fetchPosts() {
      this.loadingFeed = true
      try {
        const response = await postsApi.fetchPosts()
        this.posts = response.data.map((post) => ({
          ...post,
          likedByMe: post.likedByMe ?? false,
        }))
      } finally {
        this.loadingFeed = false
      }
    },

    async createPost(payload: CreatePostPayload) {
      this.creating = true
      try {
        const response = await postsApi.createPost(payload)

        this.posts.unshift({
          ...response.data,
          likedByMe: false,
        })

        return response.data
      } finally {
        this.creating = false
      }
    },

    async toggleLike(postId: string) {
      const { data } = await postsApi.toggleLike(postId)

      const updatePost = (post: PostWithAuthor) => {
        post.likedByMe = data.liked
        post._count.likes += data.liked ? 1 : -1
      }

      // Feed
      const postInFeed = this.posts.find((p) => p.id === postId)
      if (postInFeed) updatePost(postInFeed)

      // Perfil
      const postInUser = this.postsUser.find((p) => p.id === postId)
      if (postInUser) updatePost(postInUser)

      // Post individual
      if (this.currentPost?.id === postId) {
        updatePost(this.currentPost)
      }
    },

    async fetchByPost(postId: string) {
      this.loadingPost = true

      try {
        const { data } = await postsApi.fetchPostById(postId)

        data.likedByMe = Array.isArray(data.likes) && data.likes.length > 0

        this.currentPost = data
      } finally {
        this.loadingPost = false
      }
    },

    async fetchPostsByUser(userId: string) {
      this.loadingFeed = true
      try {
        const response = await postsApi.fetchPostsByUser(userId)

        this.postsUser = response.data.map((post) => ({
          ...post,
          likedByMe: post.likedByMe ?? false,
        }))
      } finally {
        this.loadingFeed = false
      }
    },

    clearCurrentPost() {
      this.currentPost = null
      this.currentPostId = null
    },
  },
})

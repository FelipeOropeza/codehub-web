import { defineStore } from 'pinia'
import { postsApi } from '@/api/posts'
import type { CreatePostPayload, PostWithAuthor } from '@/types/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as PostWithAuthor[],

    currentPost: null as PostWithAuthor | null,
    currentPostId: null as PostWithAuthor | null,

    loadingFeed: false,
    loadingPost: false,
    creating: false,
  }),

  actions: {
    // ===============================
    // FEED
    // ===============================
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

      // 1️⃣ Atualiza na lista de posts (home)
      const postInList = this.posts.find((p) => p.id === postId)
      if (postInList) {
        postInList.likedByMe = data.liked
        postInList._count.likes += data.liked ? 1 : -1
      }

      // 2️⃣ Atualiza o post solo (se estiver aberto)
      if (this.currentPost?.id === postId) {
        this.currentPost.likedByMe = data.liked
        this.currentPost._count.likes += data.liked ? 1 : -1
      }
    },

    // ===============================
    // POST INDIVIDUAL
    // ===============================
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

    clearCurrentPost() {
      this.currentPost = null
      this.currentPostId = null
    },
  },
})

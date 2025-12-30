import { defineStore } from 'pinia'
import { followsApi } from '@/api/follows'

export const useFollowStore = defineStore('follow', {
  state: () => ({
    isFollowing: false,
    followersCount: 0,
    followingCount: 0,
    loading: false,
  }),

  actions: {
    async checkIsFollowing(userId: string) {
      const { data } = await followsApi.isFollowing(userId)
      this.isFollowing = data
    },

    async follow(userId: string) {
      this.loading = true
      try {
        await followsApi.follow(userId)
        this.isFollowing = true
        this.followersCount++
      } finally {
        this.loading = false
      }
    },

    async unfollow(userId: string) {
      this.loading = true
      try {
        await followsApi.unfollow(userId)
        this.isFollowing = false
        this.followersCount--
      } finally {
        this.loading = false
      }
    },

    async loadCounts(userId: string) {
      const [followers, following] = await Promise.all([
        followsApi.followers(userId),
        followsApi.following(userId),
      ])

      this.followersCount = followers.data.length
      this.followingCount = following.data.length
    },
  },
})

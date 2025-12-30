import api from './api'

export const followsApi = {
  follow(userId: string) {
    return api.post(`/follows/${userId}`)
  },

  unfollow(userId: string) {
    return api.delete(`/follows/${userId}`)
  },

  isFollowing(userId: string) {
    return api.get(`/follows/${userId}/is-following`)
  },

  followers(userId: string) {
    return api.get(`/follows/${userId}/followers`)
  },

  following(userId: string) {
    return api.get(`/follows/${userId}/following`)
  },
}

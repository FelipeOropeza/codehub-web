<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useFollowStore } from '@/stores/follow'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'

import FollowButton from '@/components/FollowButton.vue'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const authStore = useAuthStore()
const followStore = useFollowStore()
const userStore = useUserStore()
const postsStore = usePostsStore()

const userId = route.params.id as string

const isOwnProfile = computed(() => {
  return authStore.user?.id === userId
})

onMounted(async () => {
  postsStore.postsUser = []

  await userStore.fetchUserById(userId)
  await postsStore.fetchPostsByUser(userId)

  if (!isOwnProfile.value && authStore.isAuthenticated) {
    await followStore.checkIsFollowing(userId)
    await followStore.loadCounts(userId)
  }
})

</script>

<template>
  <div class="bg-background-black text-foreground px-4">
    <div class="max-w-2xl mx-auto mt-10 space-y-8">

      <!-- HEADER -->
      <div class="flex items-center gap-6">
        <img
          :src="userStore.viewedUser?.avatar || '/default-avatar.png'"
          class="w-24 h-24 rounded-full object-cover border border-zinc-700"
        />

        <div class="flex-1 space-y-2">
          <h1 class="text-xl font-bold text-white">
            {{ userStore.viewedUser?.name }}
          </h1>

          <p class="text-zinc-400 text-sm">
            {{ userStore.viewedUser?.bio }}
          </p>

          <!-- FOLLOW -->
          <FollowButton
            v-if="!isOwnProfile && authStore.isAuthenticated"
            :user-id="userId"
          />
        </div>
      </div>

      <!-- STATS -->
      <div class="flex gap-6 text-sm text-zinc-300">
        <span>
          <strong>{{ followStore.followersCount }}</strong> seguidores
        </span>
        <span>
          <strong>{{ followStore.followingCount }}</strong> seguindo
        </span>
      </div>

      <!-- POSTS DO USUÁRIO -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-white">
          Postagens
        </h2>

        <!-- loading -->
        <div v-if="postsStore.loadingFeed" class="text-zinc-400">
          Carregando postagens...
        </div>

        <!-- empty -->
        <div
          v-else-if="postsStore.postsUser.length === 0"
          class="text-zinc-500"
        >
          Este usuário ainda não publicou nada.
        </div>

        <!-- list -->
        <div v-else class="space-y-4">
          <PostCard
            v-for="post in postsStore.postsUser"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>

    </div>
  </div>
</template>

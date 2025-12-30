<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useFollowStore } from '@/stores/follow'
import { useUserStore } from '@/stores/user'

import FollowButton from '@/components/FollowButton.vue'

const route = useRoute()
const authStore = useAuthStore()
const followStore = useFollowStore()
const userStore = useUserStore()

const userId = route.params.id as string

const isOwnProfile = computed(() => {
  return authStore.user?.id === userId
})

onMounted(async () => {
  await userStore.fetchUserById(userId)

  if (!isOwnProfile.value && authStore.isAuthenticated) {
    await followStore.checkIsFollowing(userId)
    await followStore.loadCounts(userId)
  }
})
</script>

<template>
  <div class="bg-background-black text-foreground px-4">
    <div class="max-w-2xl mx-auto mt-10 space-y-6">

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

    </div>
  </div>
</template>

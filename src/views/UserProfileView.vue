<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import { useUser } from '@/queries/useUserQuery'
import { usePostsByUser } from '@/queries/usePostsQuery'
import { useFollowCounts } from '@/queries/useFollowQuery'

import FollowButton from '@/components/FollowButton.vue'
import PostCard from '@/components/PostCard.vue'

/* ===============================
   SETUP
================================ */
const route = useRoute()
const authStore = useAuthStore()

const userId = route.params.id as string

/* ===============================
   QUERIES
================================ */
const { data: user, isLoading: userLoading } = useUser(userId)
const { data: posts, isLoading: postsLoading } = usePostsByUser(userId)
const { data: followCounts } = useFollowCounts(userId)

/* ===============================
   COMPUTEDS
================================ */
const isOwnProfile = computed(() => {
  return authStore.user?.id === userId
})
</script>

<template>
  <div class="bg-background-black text-foreground px-4">
    <div class="max-w-2xl mx-auto mt-10 space-y-8">

      <!-- HEADER -->
      <div class="flex items-center gap-6">
        <img
          :src="user?.avatar || '/default-avatar.png'"
          class="w-24 h-24 rounded-full object-cover border border-zinc-700"
        />

        <div class="flex-1 space-y-2">
          <h1 class="text-xl font-bold text-white">
            {{ user?.name }}
          </h1>

          <p class="text-zinc-400 text-sm">
            {{ user?.bio }}
          </p>

          <!-- FOLLOW BUTTON -->
          <FollowButton
            v-if="!isOwnProfile && authStore.isAuthenticated"
            :user-id="userId"
          />
        </div>
      </div>

      <!-- STATS -->
      <div class="flex gap-6 text-sm text-zinc-300">
        <span>
          <strong>{{ followCounts?.followers ?? 0 }}</strong> seguidores
        </span>
        <span>
          <strong>{{ followCounts?.following ?? 0 }}</strong> seguindo
        </span>
      </div>

      <!-- POSTS -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-white">
          Postagens
        </h2>

        <div v-if="postsLoading" class="text-zinc-400">
          Carregando postagens...
        </div>

        <div
          v-else-if="posts?.length === 0"
          class="text-zinc-500"
        >
          Este usuário ainda não publicou nada.
        </div>

        <div v-else class="space-y-4">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>

    </div>
  </div>
</template>

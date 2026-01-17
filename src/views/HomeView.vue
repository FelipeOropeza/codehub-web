<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import { useAuthStore } from '@/stores/auth'
import { usePosts } from '@/queries/usePostsQuery'

const auth = useAuthStore()
const { data: posts, isLoading } = usePosts()
</script>

<template>
  <div>
    <CreatePostModal v-if="auth.isAuthenticated" />

    <h2 class="text-2xl font-bold mb-4">
      Últimos códigos publicados
    </h2>

    <p class="text-zinc-400 mb-4">
      Feed público — qualquer pessoa pode ver 🚀
    </p>

    <div v-if="isLoading" class="space-y-4">
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
    </div>

    <div v-else class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

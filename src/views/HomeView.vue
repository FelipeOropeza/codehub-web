<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import PostCard from '@/components/PostCard.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'

const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPosts()
})
</script>

<template>
  <div>
    <CreatePostModal />

    <h2 class="text-2xl font-bold mb-4">
      Últimos códigos publicados
    </h2>

    <p class="text-zinc-400 mb-4">
      Feed público — qualquer pessoa pode ver 🚀
    </p>

    <div v-if="postsStore.loading" class="space-y-4">
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
    </div>

    <div v-else class="space-y-4">
      <PostCard
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

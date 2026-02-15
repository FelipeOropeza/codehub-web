<script setup lang="ts">
import { ref, watch } from 'vue'
import PostCard from '@/components/PostCard.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'
import { useAuthStore } from '@/stores/auth'
import { usePosts } from '@/queries/usePostsQuery'
import { Button } from '@/components/ui/button'

const auth = useAuthStore()
const page = ref(1)

const { data: posts, isLoading, isPlaceholderData } = usePosts(page)

watch(page, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

</script>

<template>
  <div>
    <CreatePostModal v-if="auth.isAuthenticated" />

    <h2 ref="feedTitleRef" class="text-2xl font-bold mb-4">Últimos códigos publicados</h2>

    <p class="text-zinc-400 mb-4">Feed público — qualquer pessoa pode ver 🚀</p>

    <div v-if="isLoading" class="space-y-4">
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
      <div class="h-32 bg-zinc-200 animate-pulse rounded" />
    </div>

    <div v-else class="space-y-4">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <div class="flex justify-center items-center gap-4 mt-8">
      <Button @click="page--" :disabled="page <= 1" variant="secondary"> Página Anterior </Button>
      <span class="font-medium text-sm">Página {{ page }}</span>
      <Button
        @click="page++"
        :disabled="isPlaceholderData || (posts && posts.length < 10)"
        variant="secondary"
      >
        Próxima Página
      </Button>
    </div>
  </div>
</template>

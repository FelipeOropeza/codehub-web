<script setup lang="ts">
import type { PostWithAuthor } from '@/types/posts'
import { useAuthStore } from '@/stores/auth'
import { useToggleLike } from '@/queries/usePostsQuery'
import { useRouter } from 'vue-router'
import Button from './ui/button/Button.vue'

defineProps<{
  post: PostWithAuthor
}>()

const authStore = useAuthStore()
const router = useRouter()
const { mutate: toggleLike } = useToggleLike()

const copyCode = async (code: string) => {
  await navigator.clipboard.writeText(code)
}

const goToProfile = (userId: string) => {
  router.push({ name: 'user.profile', params: { id: userId } })
}
</script>

<template>
  <article class="border border-zinc-800 rounded-lg p-4 space-y-4 bg-zinc-900 text-zinc-100">
    <!-- header -->
    <header class="flex items-center justify-between">
      <div
        class="flex items-center gap-3 cursor-pointer group"
        @click="goToProfile(post.author.id)"
      >
        <img
          v-if="post.author.avatar"
          :src="post.author.avatar"
          class="w-8 h-8 rounded-full object-cover border border-zinc-700"
        />
        <div
          v-else
          class="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium"
        >
          {{ post.author.name.charAt(0).toUpperCase() }}
        </div>

        <div class="leading-tight">
          <p class="text-sm font-medium">
            {{ post.author.name }}
          </p>
          <p class="text-xs text-zinc-400">
            {{ new Date(post.createdAt).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <span class="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">
        {{ post.language }}
      </span>
    </header>

    <h3 class="font-semibold text-lg">
      {{ post.title }}
    </h3>

    <pre class="bg-zinc-950 p-3 rounded text-sm overflow-x-auto max-h-[400px]">
<code class="font-mono">{{ post.code }}</code>
    </pre>

    <footer class="flex items-center justify-between pt-2 border-t border-zinc-800">
      <div class="flex items-center gap-4">
        <Button
          :disabled="!authStore.isAuthenticated"
          @click="authStore.isAuthenticated && toggleLike(post.id)"
          :class="{
            'text-red-500 scale-105': post.likedByMe,
            'text-zinc-400 hover:text-zinc-200': !post.likedByMe,
          }"
        >
          <span class="text-lg">
            {{ post.likedByMe ? '❤️' : '🤍' }}
          </span>
          {{ post._count.likes }}
        </Button>

        <Button
          class="text-xs text-zinc-400"
          @click="$router.push(`/posts/${post.id}`)"
        >
          💬 {{ post._count.comments }}
        </Button>
      </div>

      <Button
        @click="copyCode(post.code)"
        class="text-xs px-2 py-1 rounded bg-zinc-700"
      >
        Copiar código
      </Button>
    </footer>
  </article>
</template>

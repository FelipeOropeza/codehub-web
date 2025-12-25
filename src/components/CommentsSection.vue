<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  postId: string
}>()

const commentsStore = useCommentsStore()
const authStore = useAuthStore()

const content = ref('')

onMounted(() => {
  commentsStore.fetchByPost(props.postId)
})

const sendComment = async () => {
  if (!content.value.trim()) return

  await commentsStore.createComment({
    postId: props.postId,
    content: content.value,
  })

  content.value = ''
}
</script>

<template>
  <section class="space-y-4 mt-4">
    <!-- criar comentário -->
    <div v-if="authStore.isAuthenticated" class="flex gap-2">
      <input
        v-model="content"
        placeholder="Escreva um comentário..."
        class="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100"
      />
      <button
        @click="sendComment"
        :disabled="commentsStore.creating"
        class="px-4 py-2 bg-zinc-700 rounded text-sm hover:bg-zinc-600 disabled:opacity-50"
      >
        Enviar
      </button>
    </div>

    <!-- lista -->
    <div
      v-for="comment in commentsStore.comments"
      :key="comment.id"
      class="flex gap-3"
    >
      <img
        v-if="comment.author.avatar"
        :src="comment.author.avatar"
        class="w-8 h-8 rounded-full"
      />
      <div
        v-else
        class="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs"
      >
        {{ comment.author.name.charAt(0).toUpperCase() }}
      </div>

      <div class="flex-1">
        <p class="text-sm font-medium text-zinc-100">
          {{ comment.author.name }}
        </p>
        <p class="text-sm text-zinc-300">
          {{ comment.content }}
        </p>
      </div>

      <button
        v-if="authStore.user?.id === comment.author.id"
        @click="commentsStore.deleteComment(comment.id)"
        class="text-xs text-red-400 hover:text-red-500"
      >
        excluir
      </button>
    </div>
  </section>
</template>

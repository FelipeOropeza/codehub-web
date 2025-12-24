<script setup lang="ts">
import type { PostWithAuthor } from '@/types/posts'

defineProps<{
  post: PostWithAuthor
}>()

const copyCode = async (code: string) => {
  await navigator.clipboard.writeText(code)
}
</script>

<template>
  <article class="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900 text-zinc-100">
    <!-- header do post -->
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- avatar -->
        <img
          v-if="post.author.avatar"
          :src="post.author.avatar"
          alt="Avatar"
          class="w-8 h-8 rounded-full"
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

      <!-- linguagem -->
      <span class="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">
        {{ post.language }}
      </span>
    </header>

    <!-- título -->
    <h3 class="font-semibold text-lg">
      {{ post.title }}
    </h3>

    <!-- bloco de código -->
    <div class="rounded border border-zinc-800 overflow-hidden">
      <!-- header do código -->
      <div class="flex items-center justify-between px-3 py-2 bg-zinc-800 text-xs text-zinc-300">
        <span class="font-mono">
          {{ post.language }}
        </span>

        <button
          class="px-2 py-1 rounded bg-zinc-700 text-zinc-100 hover:bg-zinc-600 transition"
          @click="copyCode(post.code)"
        >
          Copiar
        </button>
      </div>

      <!-- conteúdo com scroll -->
      <pre class="bg-zinc-950 p-3 text-sm overflow-auto max-h-[400px] text-zinc-100">
<code class="font-mono">{{ post.code }}</code>
      </pre>
    </div>
  </article>
</template>

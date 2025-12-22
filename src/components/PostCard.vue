<script setup lang="ts">
import type { Post } from '@/types/posts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="border rounded-lg p-4 space-y-2">
    <div class="text-sm text-zinc-500 flex justify-between">
      <span>@{{ post.title }}</span>
      <span>{{ post.language }}</span>
    </div>

    <pre class="bg-zinc-100 p-3 rounded text-sm overflow-x-auto">
<code class="text-black">{{ post.code }}</code>
    </pre>
  </div>
</template>

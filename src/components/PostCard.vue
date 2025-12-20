<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps<{
  author: string
  language: string
  code: string
}>()
</script>

<template>
  <div class="border border-zinc-800 rounded-lg p-4 space-y-3">
    <div class="flex justify-between text-sm text-zinc-400">
      <span>@{{ author }}</span>
      <span>{{ language }}</span>
    </div>

    <pre class="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
<code>{{ code }}</code>
    </pre>

    <div class="flex gap-2">
      <Button size="sm" variant="ghost">❤️ Curtir</Button>
      <Button size="sm" variant="ghost">💬 Comentar</Button>
    </div>
  </div>
</template>

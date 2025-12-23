<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const postsStore = usePostsStore()

const title = ref('')
const language = ref('')
const code = ref('')
const open = ref(false)

const submit = async () => {
  if (!title.value || !language.value || !code.value) return

  await postsStore.createPost({
    title: title.value,
    code: code.value,
    language: language.value,
  })

  title.value = ''
  language.value = ''
  code.value = ''
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <!-- botão que abre o modal -->
    <DialogTrigger as-child>
      <Button class="mb-6"> + Novo post </Button>
    </DialogTrigger>

    <!-- modal -->
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle> Publicar novo código </DialogTitle>
      </DialogHeader>

      <div class="space-y-4">
        <Input v-model="title" placeholder="Título" />

        <Input v-model="language" placeholder="Linguagem (ex: PHP, JS)" />

        <Textarea v-model="code" rows="6" placeholder="Cole seu código aqui" class="font-mono" />

        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="open = false"> Cancelar </Button>

          <Button @click="submit" :disabled="postsStore.creating">
            {{ postsStore.creating ? 'Publicando...' : 'Publicar' }}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

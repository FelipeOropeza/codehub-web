<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts'
import CodeEditor from '@/components/CodeEditor.vue'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const postsStore = usePostsStore()

const title = ref('')
const language = ref('')
const code = ref('')
const open = ref(false)

const submit = async () => {
  if (!title.value || !code.value || !language.value) return

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
    <DialogTrigger as-child>
      <Button class="mb-6"> + Novo post </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-5xl">
      <DialogHeader>
        <DialogTitle>Publicar novo código</DialogTitle>
      </DialogHeader>

      <div class="space-y-4">
        <Input v-model="title" placeholder="Título" />

        <!-- linguagem -->
        <div class="flex gap-2">
          <Select v-model="language">
            <SelectTrigger class="w-[240px]">
              <SelectValue placeholder="Selecione a linguagem" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="PHP">PHP</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="C#">C#</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>

          <!-- se escolher "Outro" -->
          <Input
            v-if="language === 'Outro'"
            v-model="language"
            placeholder="Digite a linguagem"
          />
        </div>

        <!-- editor genérico -->
        <CodeEditor v-model="code" />

        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="open = false">
            Cancelar
          </Button>

          <Button @click="submit" :disabled="postsStore.creating">
            Publicar
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

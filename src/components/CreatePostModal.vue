<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
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
const open = ref(false)

/* ===============================
   ZOD SCHEMA (PORTUGUÊS)
================================ */
const postSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(1, 'O título é obrigatório')
      .max(100, 'O título é muito longo'),

    language: z
      .string()
      .min(1, 'A linguagem é obrigatória'),

    code: z
      .string()
      .min(10, 'O código deve ter pelo menos 10 caracteres'),
  })
)

/* ===============================
   FORM (valores iniciais)
================================ */
const { handleSubmit, resetForm } = useForm({
  validationSchema: postSchema,
  initialValues: {
    title: '',
    language: '',
    code: '',
  },
})

const { value: title, errorMessage: titleError } =
  useField<string>('title')

const { value: language, errorMessage: languageError } =
  useField<string>('language')

const { value: code, errorMessage: codeError } =
  useField<string>('code')

/* ===============================
   SUBMIT
================================ */
const submit = handleSubmit(async (values) => {
  await postsStore.createPost(values)

  resetForm()
  open.value = false
})
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

      <form class="space-y-4" @submit.prevent="submit">
        <!-- TÍTULO -->
        <div>
          <Input v-model="title" placeholder="Título" />
          <p v-if="titleError" class="text-sm text-red-500 mt-1">
            {{ titleError }}
          </p>
        </div>

        <!-- LINGUAGEM -->
        <div class="flex gap-2 items-start">
          <div>
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

            <p v-if="languageError" class="text-sm text-red-500 mt-1">
              {{ languageError }}
            </p>
          </div>

          <!-- SE FOR OUTRO -->
          <Input
            v-if="language === 'Outro'"
            v-model="language"
            placeholder="Digite a linguagem"
          />
        </div>

        <!-- CODE -->
        <div>
          <CodeEditor v-model="code" />
          <p v-if="codeError" class="text-sm text-red-500 mt-1">
            {{ codeError }}
          </p>
        </div>

        <!-- AÇÕES -->
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            @click="open = false"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            :disabled="postsStore.creating"
          >
            Publicar
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

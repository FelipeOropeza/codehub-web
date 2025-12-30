<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const userStore = useUserStore()

const form = ref({
  name: '',
  bio: '',
})

const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const loading = ref(false)

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      form.value.name = user.name || ''
      form.value.bio = user.bio || ''
      avatarPreview.value = user.avatar || null
    }
  },
  { immediate: true },
)

const openFilePicker = () => {
  fileInputRef.value?.click()
}

const onAvatarChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  avatarFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

const submit = async () => {
  loading.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('bio', form.value.bio)

    if (avatarFile.value) {
      formData.append('avatar', avatarFile.value)
    }

    const updatedUser = await userStore.updateProfile(formData)

    // 🔥 ATUALIZA O USUÁRIO GLOBAL (NAV, POSTS, ETC)
    authStore.updateUser(updatedUser)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="bg-background-black text-foreground px-4">
    <div class="max-w-2xl mx-auto mt-10">
      <Card class="bg-zinc-900 border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle class="text-white">Meu perfil</CardTitle>
          <CardDescription class="text-zinc-400">
            Atualize suas informações públicas do CodeHub
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-8">
          <!-- Avatar -->
          <div class="flex items-center gap-6">
            <img
              :src="avatarPreview || '/default-avatar.png'"
              class="w-24 h-24 rounded-full object-cover border border-zinc-700"
            />

            <Button
              variant="outline"
              type="button"
              class="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              @click="openFilePicker"
            >
              Alterar avatar
            </Button>

            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onAvatarChange"
            />
          </div>

          <!-- Nome -->
          <div class="space-y-2">
            <Label class="text-zinc-300">Nome</Label>
            <Input
              v-model="form.name"
              placeholder="Seu nome"
              class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <!-- Bio -->
          <div class="space-y-2">
            <Label class="text-zinc-300">Bio</Label>
            <Textarea
              v-model="form.bio"
              rows="4"
              placeholder="Fale um pouco sobre você..."
              class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
            />
          </div>

          <!-- Ações -->
          <div class="flex justify-end">
            <Button
              @click="submit"
              :disabled="loading"
              class="bg-indigo-600 hover:bg-indigo-500 text-white gap-2"
            >
              <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
              Salvar alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const userStore = useUserStore()

const form = ref({
  name: '',
  bio: '',
})

// garante que o form carrega mesmo se o user vier async
watch(
  () => userStore.user,
  (user) => {
    if (user) {
      form.value.name = user.name || ''
      form.value.bio = user.bio || ''
    }
  },
  { immediate: true }
)

const submit = async () => {
  await userStore.updateProfile(form.value)
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <Card>
      <CardHeader>
        <CardTitle>Meu perfil</CardTitle>
        <CardDescription>
          Atualize suas informações públicas do CodeHub
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- Nome -->
        <div class="space-y-2">
          <Label>Nome</Label>
          <Input v-model="form.name" placeholder="Seu nome" />
        </div>

        <!-- Bio -->
        <div class="space-y-2">
          <Label>Bio</Label>
          <Textarea
            v-model="form.bio"
            placeholder="Fale um pouco sobre você..."
            rows="4"
          />
        </div>

        <!-- Ações -->
        <div class="flex justify-end">
          <Button @click="submit">
            Salvar alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

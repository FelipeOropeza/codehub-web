<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  await userStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  router.push('/login')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 space-y-4">
    <h1 class="text-2xl font-bold text-center">Criar conta</h1>

    <Input v-model="name" placeholder="Nome" />
    <Input v-model="email" type="email" placeholder="Email" />
    <Input v-model="password" type="password" placeholder="Senha" />

    <Button class="w-full" :disabled="userStore.loading" @click="handleRegister">
      Cadastrar
    </Button>

    <p class="text-sm text-center text-zinc-500">
      Já tem conta?
      <RouterLink to="/login" class="underline">Entrar</RouterLink>
    </p>
  </div>
</template>

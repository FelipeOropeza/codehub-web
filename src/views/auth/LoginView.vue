<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  const res = await authApi.login({
    email: email.value,
    password: password.value,
  })

  authStore.login(res.data.accessToken, res.data.user)
  router.push('/')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 space-y-4">
    <h1 class="text-2xl font-bold text-center">Entrar</h1>

    <Input v-model="email" type="email" placeholder="Email" />
    <Input v-model="password" type="password" placeholder="Senha" />

    <Button class="w-full" @click="handleLogin">
      Login
    </Button>

    <p class="text-sm text-center text-zinc-500">
      Não tem conta?
      <RouterLink to="/register" class="underline">Cadastre-se</RouterLink>
    </p>
  </div>
</template>

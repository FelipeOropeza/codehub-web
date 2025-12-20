<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const auth = useAuthStore()

const email = ref('')
const password = ref('')

function handleLogin() {
  // depois você troca por API real
  auth.login({
    id: '1',
    name: 'Felipe',
    email: email.value,
  })
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
      <RouterLink to="/register" class="underline">
        Cadastre-se
      </RouterLink>
    </p>
  </div>
</template>

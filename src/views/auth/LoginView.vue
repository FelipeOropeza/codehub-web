<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch {
  }
}
</script>
<template>
  <div class="max-w-md mx-auto mt-20 space-y-4">
    <h1 class="text-2xl font-bold text-center">Entrar</h1>

    <p
      v-if="authStore.errors.form"
      class="text-sm text-red-500 text-center"
    >
      {{ authStore.errors.form }}
    </p>

    <div>
      <Input v-model="email" type="email" placeholder="Email" />
      <p v-if="authStore.errors.email" class="text-xs text-red-500 mt-1">
        {{ authStore.errors.email }}
      </p>
    </div>

    <div>
      <Input v-model="password" type="password" placeholder="Senha" />
      <p v-if="authStore.errors.password" class="text-xs text-red-500 mt-1">
        {{ authStore.errors.password }}
      </p>
    </div>

    <Button
      class="w-full"
      :disabled="authStore.loading"
      @click="handleLogin"
    >
      {{ authStore.loading ? 'Entrando...' : 'Login' }}
    </Button>

    <p class="text-sm text-center text-zinc-500">
      Não tem conta?
      <RouterLink to="/register" class="underline">
        Cadastre-se
      </RouterLink>
    </p>
  </div>
</template>


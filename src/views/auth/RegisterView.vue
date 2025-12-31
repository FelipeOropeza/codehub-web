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
  try {
    await userStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push('/login')
  } catch {
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 space-y-4">
    <h1 class="text-2xl font-bold text-center">Criar conta</h1>

    <!-- erro geral -->
    <p
      v-if="userStore.errors.form"
      class="text-sm text-red-500 text-center"
    >
      {{ userStore.errors.form }}
    </p>

    <div>
      <Input v-model="name" placeholder="Nome" />
      <p v-if="userStore.errors.name" class="text-xs text-red-500 mt-1">
        {{ userStore.errors.name }}
      </p>
    </div>

    <div>
      <Input v-model="email" type="email" placeholder="Email" />
      <p v-if="userStore.errors.email" class="text-xs text-red-500 mt-1">
        {{ userStore.errors.email }}
      </p>
    </div>

    <div>
      <Input v-model="password" type="password" placeholder="Senha" />
      <p v-if="userStore.errors.password" class="text-xs text-red-500 mt-1">
        {{ userStore.errors.password }}
      </p>
    </div>

    <Button
      class="w-full"
      :disabled="userStore.loading"
      @click="handleRegister"
    >
      {{ userStore.loading ? 'Criando conta...' : 'Cadastrar' }}
    </Button>

    <p class="text-sm text-center text-zinc-500">
      Já tem conta?
      <RouterLink to="/login" class="underline">Entrar</RouterLink>
    </p>
  </div>
</template>

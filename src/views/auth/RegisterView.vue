<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRegister } from '@/queries/useUserQuery'

const router = useRouter()
const { mutateAsync: register, isPending } = useRegister()

const name = ref('')
const email = ref('')
const password = ref('')

const errors = ref<{
  name?: string
  email?: string
  password?: string
  form?: string
}>({})

async function handleRegister() {
  errors.value = {}

  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push('/login')
  } catch (err: any) {
    errors.value = err
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 space-y-4">
    <h1 class="text-2xl font-bold text-center">Criar conta</h1>

    <!-- erro geral -->
    <p v-if="errors.form" class="text-sm text-red-500 text-center">
      {{ errors.form }}
    </p>

    <div>
      <Input v-model="name" placeholder="Nome" />
      <p v-if="errors.name" class="text-xs text-red-500 mt-1">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <Input v-model="email" type="email" placeholder="Email" />
      <p v-if="errors.email" class="text-xs text-red-500 mt-1">
        {{ errors.email }}
      </p>
    </div>

    <div>
      <Input v-model="password" type="password" placeholder="Senha" />
      <p v-if="errors.password" class="text-xs text-red-500 mt-1">
        {{ errors.password }}
      </p>
    </div>

    <Button class="w-full" :disabled="isPending" @click="handleRegister">
      {{ isPending ? 'Criando conta...' : 'Cadastrar' }}
    </Button>

    <p class="text-sm text-center text-zinc-500">
      Já tem conta?
      <RouterLink to="/login" class="underline">Entrar</RouterLink>
    </p>
  </div>
</template>

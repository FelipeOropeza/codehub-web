<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'

const auth = useAuthStore()
</script>

<template>
  <header class="border-b bg-zinc-950 text-white">
    <div class="max-w-6xl mx-auto h-14 flex items-center justify-between px-4">
      <RouterLink to="/" class="font-bold text-lg">
        CodeShare
      </RouterLink>

      <!-- DESLOGADO -->
      <div v-if="!auth.isAuthenticated" class="flex gap-2">
        <Button variant="outline" as-child>
          <RouterLink class="text-gray-500" to="/login">Login</RouterLink>
        </Button>

        <Button as-child>
          <RouterLink to="/register">Cadastrar</RouterLink>
        </Button>
      </div>

      <!-- LOGADO -->
      <div v-else class="flex items-center gap-4">
        <span class="text-sm">
          Olá, <strong>{{ auth.user?.name }}</strong>
        </span>

        <Button variant="ghost" @click="auth.logout">
          Sair
        </Button>
      </div>
    </div>
  </header>
</template>

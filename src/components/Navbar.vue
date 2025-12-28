<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'

const auth = useAuthStore()
</script>

<template>
  <header class="border-b bg-zinc-950 text-white">
    <div class="max-w-6xl mx-auto h-14 flex items-center justify-between px-4">
      <RouterLink to="/" class="font-bold text-lg">
        CodeHub
      </RouterLink>

      <!-- DESLOGADO -->
      <div v-if="!auth.isAuthenticated" class="flex gap-2">
        <Button variant="outline" as-child>
          <RouterLink to="/login">Login</RouterLink>
        </Button>

        <Button as-child>
          <RouterLink to="/register">Cadastrar</RouterLink>
        </Button>
      </div>

      <!-- LOGADO -->
      <div v-else class="flex items-center gap-4">
        <!-- Link para perfil -->
        <RouterLink
          to="/profile"
          class="text-sm text-gray-300 hover:text-white transition"
        >
          Olá, <strong>{{ auth.user?.name }}</strong>
        </RouterLink>

        <Button variant="ghost" @click="auth.logout">
          Sair
        </Button>
      </div>
    </div>
  </header>
</template>

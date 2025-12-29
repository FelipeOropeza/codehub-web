<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { router } from '@/router'

const auth = useAuthStore()

const initial = computed(() =>
  auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : '?',
)

const logout = () => {
  auth.logout()
  router.push({ name: 'home' })
}

</script>

<template>
  <header class="border-b border-zinc-800 bg-zinc-950 text-white">
    <div class="max-w-6xl mx-auto h-14 flex items-center justify-between px-4">
      <RouterLink to="/" class="font-bold text-lg">
        CodeHub
      </RouterLink>

      <!-- DESLOGADO -->
      <div v-if="!auth.isAuthenticated" class="flex gap-2">
        <Button variant="outline" as-child>
          <RouterLink class="text-black" to="/login">Login</RouterLink>
        </Button>

        <Button as-child>
          <RouterLink to="/register">Cadastrar</RouterLink>
        </Button>
      </div>

      <!-- LOGADO -->
      <div v-else class="flex items-center gap-4">
        <!-- Perfil -->
        <RouterLink
          to="/profile"
          class="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <!-- Avatar -->
          <div
            class="w-8 h-8 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center text-white font-semibold"
          >
            <img
              v-if="auth.user?.avatar"
              :src="auth.user.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <span v-else>
              {{ initial }}
            </span>
          </div>

          <span>
            <strong>{{ auth.user?.name }}</strong>
          </span>
        </RouterLink>

        <Button variant="ghost" @click="logout" class="text-red-500 hover:bg-red-600">
          Sair
        </Button>
      </div>
    </div>
  </header>
</template>

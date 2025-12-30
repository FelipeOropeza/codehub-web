<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useFollowStore } from '@/stores/follow'

const props = defineProps<{
  userId: string
}>()

const followStore = useFollowStore()

const toggleFollow = () => {
  if (followStore.isFollowing) {
    followStore.unfollow(props.userId)
  } else {
    followStore.follow(props.userId)
  }
}
</script>

<template>
  <Button
    @click="toggleFollow"
    :disabled="followStore.loading"
    :variant="followStore.isFollowing ? 'outline' : 'default'"
    class="min-w-[120px]"
  >
    {{ followStore.isFollowing ? 'Seguindo' : 'Seguir' }}
  </Button>
</template>

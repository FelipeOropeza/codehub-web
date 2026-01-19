<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  useIsFollowing,
  useFollowUser,
  useUnfollowUser,
} from '@/queries/useFollowQuery'

const props = defineProps<{
  userId: string
}>()

const { data: isFollowing } = useIsFollowing(props.userId)
const { mutate: follow, isPending: followLoading } =
  useFollowUser(props.userId)
const { mutate: unfollow, isPending: unfollowLoading } =
  useUnfollowUser(props.userId)

const toggleFollow = () => {
  if (isFollowing.value) {
    unfollow()
  } else {
    follow()
  }
}
</script>

<template>
  <Button
    @click="toggleFollow"
    :disabled="followLoading || unfollowLoading"
    :variant="isFollowing ? 'outline' : 'default'"
    class="min-w-[120px]"
  >
    {{ isFollowing ? 'Seguindo' : 'Seguir' }}
  </Button>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePostById } from '@/queries/usePostsQuery'

import PostCard from '@/components/PostCard.vue'
import CommentsSection from '@/components/CommentsSection.vue'

const route = useRoute()
const postId = route.params.id as string

const { data: post, isLoading } = usePostById(postId)
</script>

<template>
  <div v-if="isLoading" class="text-zinc-400">
    Carregando...
  </div>

  <div v-else-if="post" class="space-y-6">
    <PostCard :post="post" />
    <CommentsSection :postId="post.id" />
  </div>
</template>

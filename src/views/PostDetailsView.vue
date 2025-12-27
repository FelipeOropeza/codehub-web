<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useCommentsStore } from '@/stores/comments'
import PostCard from '@/components/PostCard.vue'
import CommentsSection from '@/components/CommentsSection.vue'

const route = useRoute()
const postsStore = usePostsStore()
const commentsStore = useCommentsStore()

watch(
  () => route.params.id,
  async (id) => {
    if (!id) return

    postsStore.currentPost = null
    commentsStore.comments = []

    await postsStore.fetchByPost(id as string)

    commentsStore.fetchCommentsByPost(id as string)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="postsStore.currentPost" class="space-y-6">
    <PostCard :post="postsStore.currentPost" />

    <CommentsSection :postId="postsStore.currentPost.id" />
  </div>
</template>

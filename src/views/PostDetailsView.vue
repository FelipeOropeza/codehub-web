<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import CommentsSection from '@/components/CommentsSection.vue'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPostById(route.params.id as string)
})
</script>

<template>
  <div v-if="postsStore.currentPost" class="space-y-6">
    <PostCard :post="postsStore.currentPost" />

    <CommentsSection :postId="postsStore.currentPost.id" />
  </div>
</template>

import api from "./api";
import type { CreatePostPayload, PostWithAuthor } from "@/types/posts";

export const postsApi = {
  fetchPosts() {
    return api.get<PostWithAuthor[]>('/posts');
  },

  createPost(payload: CreatePostPayload) {
    return api.post<PostWithAuthor>('/posts/create', payload);
  }
}

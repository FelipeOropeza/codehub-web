import api from "./api";
import type { Post, CreatePostPayload } from "@/types/posts";

export const postsApi = {
  fetchPosts() {
    return api.get<Post[]>('/posts');
  },

  createPost(payload: CreatePostPayload) {
    return api.post<Response>('/posts/create', payload);
  }
}

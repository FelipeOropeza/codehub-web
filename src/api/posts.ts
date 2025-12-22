import api from "./api";
import type { Post } from "@/types/posts";

export const postsApi = {
  fetchPosts() {
    return api.get<Post[]>('/posts');
  },
}

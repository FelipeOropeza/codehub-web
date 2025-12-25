export interface CommentAuthor {
  id: string
  name: string
  avatar?: string | null
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  author: CommentAuthor
}

export interface CreateCommentPayload {
  postId: string
  content: string
}

export interface CreatePostPayload {
  title: string
  code: string
  language: string
}

export interface PostWithAuthor {
  id: string
  title: string
  code: string
  language: string
  createdAt: string

  author: {
    id: string
    name: string
    avatar?: string | null
  }

  _count: {
    likes: number
    comments: number
  }

  likedByMe?: boolean
}

export interface Post {
  id: string
  title: string
  code: string
  language: string
  createdAt: string
  authorId: string
}

export interface CreatePostPayload {
  title: string
  code: string
  language: string
}


export interface Response{
  message: string
}



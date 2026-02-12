import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userApi } from '@/api/users'
import type { User, RegisterPayload } from '@/types/users'
import axios from 'axios'

/* ===============================
   QUERY KEYS
================================ */
const USER_KEY = (id: string) => ['user', id]
const ME_KEY = ['me']

/* ===============================
   REGISTRO
================================ */
export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => userApi.register(payload).then((res) => res.data),
  })
}

/* ===============================
   USUÁRIO POR ID (perfil público)
================================ */
export function useUser(userId: string) {
  return useQuery<User>({
    queryKey: USER_KEY(userId),
    queryFn: async () => {
      const { data } = await userApi.getById(userId)
      return data
    },
    enabled: !!userId,
  })
}

/* ===============================
   ATUALIZAR PERFIL
================================ */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: FormData) => userApi.updateProfile(payload).then((res) => res.data),

    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData<User>(ME_KEY, updatedUser)
      queryClient.setQueryData<User>(USER_KEY(updatedUser.id), updatedUser)
    },
  })
}

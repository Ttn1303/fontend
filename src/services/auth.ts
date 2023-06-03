import { ChangePasswordPayload, LoginPayload } from '@/types/auth'
import { client } from './client'
import { UserInfo } from '@/types/user'

export const AuthService = {
  login(payload: LoginPayload): Promise<UserInfo[]> {
    return client.post('/login', { ...payload })
  },
  changePassword(payload: ChangePasswordPayload) {
    return client.post('/auth/change-password', { ...payload })
  }
}
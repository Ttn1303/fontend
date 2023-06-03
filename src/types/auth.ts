export type LoginPayload = {
  email: string
  password: string
}

export type ChangePasswordPayload = {
  old_password: string
  new_password: string
  new_password_confirmation: string
}

export type UserResponse = {
  name: string
  role: string
}
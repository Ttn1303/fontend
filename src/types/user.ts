export type UserInfo = {
  id: number
  email: string
  name: string
  age?: number
  address?: string
  phone?: string
  sex: string
  role: string
}

export type UserPayload = {
  name?: string
  page?: number
  page_size?: number
}

export type UserResponse = {
  total: number
  data: UserInfo[]
  current_page: number
  per_page: number
}

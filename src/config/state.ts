import { RoleConfig, StateConfig } from '@/types/config'

export const statesSelect: StateConfig[] = [
  { value: 1, label: 'Tiếp nhận', color: 'default' },
  { value: 2, label: 'Đang xử lý', color: 'processing' },
  { value: 3, label: 'Hoàn thành', color: 'success' },
]

export const roleSelect: RoleConfig[] = [
  { value: 'admin', label: 'Quản lý' },
  { value: 'business_staff', label: 'Nhân viên kinh doanh' },
  { value: 'staff', label: 'Nhân viên sửa chữa' },
]
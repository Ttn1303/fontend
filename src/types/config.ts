export type StateConfig = {
  value: number
  label: string
  color: string
}

export type RoleConfig = {
  value: string
  label: string
}

export interface Transaction {
  id: string
  status: string
  total: number
}

export interface TableInventoryData {
  key: React.Key
  group: string
  code: string
  name: string
  unit: string
  import: number
  export: number
  total: number
}

export type TableAccessaryInforData = {
  id: number
  name_accessary: string
  name_unit: string
  quantity: number
  price: number
}

import { AccessaryGroup, Unit } from "./accessary"

export type Inventory = {
    id: number
    accessary_group: AccessaryGroup
    code: string
    name: string
    unit: Unit
    import: number
    export: number
    inventory: number
}

export type InventoryResponse = {
    total: number
    data: Inventory[]
    current_page: number
    per_page: number
}

export type InventoryPayload = {
    date?: string[]
    group?: string
    page: number
    page_size: number
}
export type AccessaryGroup = {
    id: number
    name: string
}

export type Unit = {
    id: number
    name: string
}

export type Accessary = {
    id: number
    accessary_group: AccessaryGroup
    code: string
    name: string
    unit: Unit
    price: number
    import_price: number
    quantity: number
    description: string
}

export type AccessaryResponse = {
    total: number
    data: Accessary[]
    current_page: number
    per_page: number
}

export type AccessaryPayload = {
    group?: string
    page: number
    page_size: number
}

export type AccessarySelect = {
    value: number
    label: string
}


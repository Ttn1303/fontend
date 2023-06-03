import { Accessary } from "./accessary"
import { UserInfo } from "./user"

export type Receipt = {
    id: number
    user: UserInfo
    receipt_name: string
    receipt_date: string
    total: number
    note: string
}

export type ReceiptDetail = {
    receipt: Receipt
    accessary: Accessary
    quantity: number
    import_price: number
}

export type Histoy = {
    id: number
    receipt: Receipt
    accessary: Accessary
    quantity: number
    import_price: number
}

export type HistoryResponse = {
    total: number
    data: Histoy[]
    current_page: number
    per_page: number
}

export type HistoryPayload = {
    name?: string
    page: number
    page_size: number
}
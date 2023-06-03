import { UserInfo } from "./user"

export type Customer = {
    id: number
    name: string
    phone: number
    address: string
}

export type VehicleInfor = {
    id: number
    licensePlates: string
    type_vehicle: string
    yearProduct: number
    frameNumber: number
    color: string
    capacity: string
    brand: Brand
    model: string
    kmNumber: number
}

export type Repair = {
    id: number
    customer: Customer
    vehicle_infor: VehicleInfor
    code: string
    state: string
    user: UserInfo
    created_at: string
    appointmentDate: string
    note: string
    service: string
    vehicleCondition: string
    customerRequest: string
}

export type RepairResponse = {
    total: number
    data: Repair[]
    current_page: number
    per_page: number
}

export type RepairPayload = {
    state?: number | string
    name?: string
    page: number
    page_size: number
}

export type Brand = {
    id: number
    name: string
}
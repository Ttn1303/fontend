import { client } from "./client";
import { TableAccessaryInforData } from "@/types/config";

export const repairDetailService = {
    getRepairDetailbyId(id: string | string[] | undefined): Promise<TableAccessaryInforData[]> {
        return client.get(`/repair-detail/${id}`)
    },
    addRepairDetail(id: number | undefined, accessary: number | undefined, quantity: number | null) {
        return client.post(`/repair-detail/add-accessary-quantity/${id}`, { accessary, quantity })
    },
    payment(id: number | undefined, total: number | undefined, payments: TableAccessaryInforData[]) {
        return client.post(`repair-detail/update-repair/${id}`, { total, payments })
    },
    deleteById(id: number | undefined, accessary_id: number | undefined): Promise<TableAccessaryInforData> {
        return client.post(`/repair-detail/delete/${id}`, { accessary_id })
    }
}
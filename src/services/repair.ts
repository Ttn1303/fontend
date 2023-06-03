import { Brand, Repair, RepairPayload, RepairResponse } from "@/types/repair";
import { client } from "./client";
import { Transaction } from "@/types/config";

export const repairService = {
    getListBrand(): Promise<Brand[]> {
        return client.get('/brand');
    },
    getTransaction(): Promise<Transaction[]> {
        return client.get('/repair/transaction');
    },
    getListRepair(payload: RepairPayload): Promise<RepairResponse> {
        const params = payload
        return client.get('/repair', { params });
    },
    getRepairbyId(id: string | string[] | undefined): Promise<Repair> {
        return client.get(`/repair/${id}`)
    },
    addRepair(payload: Repair) {
        return client.post('/repair/create', { ...payload })
    },
    updateStateRepair(id: number | undefined, state: string | undefined) {
        return client.post(`/repair/${id}`, { state })
    },
    DeleteRepairById(id: string | number | undefined): Promise<Repair> {
        return client.delete(`/repair/delete/${id}`)
    },
    getSales(): Promise<number[]> {
        return client.get(`/repair/sale`)
    }
}

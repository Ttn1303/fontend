import { Accessary, AccessaryGroup, AccessaryPayload, AccessaryResponse, Unit } from "@/types/accessary";
import { client } from "./client";
import { ReceiptDetail } from "@/types/receipt";
import { UserInfo } from "@/types/user";

export const accessaryService = {
    getListAccessary(payload: AccessaryPayload): Promise<AccessaryResponse> {
        const params = payload
        return client.get('/accessary', { params });
    },
    getListGroup(): Promise<AccessaryGroup[]> {
        return client.get('/accessary-group/group');
    },
    getListUnit(): Promise<Unit[]> {
        return client.get('/accessary-group/unit');
    },
    getListUser():Promise<UserInfo[]>{
        return client.get('/accessary/listUser')
    },
    getAccessarybyId(id: string | string[] | undefined): Promise<Accessary> {
        return client.get(`/accessary/${id}`)
    },
    addAccessary(payload: Accessary) {
        return client.post('/accessary/create', { ...payload })
    },
    addAccessaryGroup(name: string) {
        return client.post('/accessary-group/create', { name })
    },
    updateAccessary(id: number | undefined, accessary: ReceiptDetail) {
        return client.post(`/accessary/add-quantity/${id}`, { ...accessary })
    },
    deleteAccessaryById(id: string | number | undefined): Promise<Accessary> {
        return client.delete(`/accessary/delete/${id}`)
    }
}

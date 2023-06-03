import { UserInfo, UserPayload, UserResponse } from "@/types/user";
import { client } from "./client";

export const userService = {
    getListUser(payload: UserPayload): Promise<UserResponse> {
        const params = payload
        return client.get('/user', { params });
    },
    getUserbyId(id: string | string[] | undefined): Promise<UserInfo> {
        return client.get(`/user/${id}`)
    },
    addUser(payload: UserInfo) {
        return client.post('/user/create', { ...payload })
    },
    updateUser(id: number | undefined, user: UserInfo) {
        return client.post(`/user/update/${id}`, { ...user })
    },
    deleteUserById(id: string | number | undefined): Promise<UserInfo> {
        return client.delete(`/user/delete/${id}`)
    }
}
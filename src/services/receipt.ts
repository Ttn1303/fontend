import { HistoryPayload, HistoryResponse } from "@/types/receipt";
import { client } from "./client";

export const historyService = {
    getListReceipt(payload: HistoryPayload): Promise<HistoryResponse> {
        const params = payload
        return client.get('/receipt', { params });
    }
}
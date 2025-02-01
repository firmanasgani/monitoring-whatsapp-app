import { apiInterceptors } from "../utils/apiInterceptors";
import { MESSAGE_FROM_DATABASE_GET } from "../utils/variables/endpoint";

export const MessageDataHistories = async (query: Record<string, string | number>) => {
    try {
        const response = await apiInterceptors(MESSAGE_FROM_DATABASE_GET, {}, {}, query);
        return response;
    } catch (error: any) {
        console.error(error);
    }
}
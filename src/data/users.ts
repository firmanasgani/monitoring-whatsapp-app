import { apiInterceptors } from "../utils/apiInterceptors";
import { USERS_GET_LIST_ALL } from "../utils/variables/endpoint";

export const UserData = async(query?: Record<string, string | number>) => {
    try {
        const response = await apiInterceptors(USERS_GET_LIST_ALL, {}, {}, query);
        return response.data
    }catch(error) {
        console.error(error);
    }
}
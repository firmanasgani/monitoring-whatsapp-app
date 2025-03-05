import { apiInterceptors } from "../utils/apiInterceptors";
import { USERS_GET_LIST_ALL } from "../utils/variables/endpoint";

export const UserData = async() => {
    try {
        const response = await apiInterceptors(USERS_GET_LIST_ALL)
        return response.data
    }catch(error) {
        console.error(error);
    }
}
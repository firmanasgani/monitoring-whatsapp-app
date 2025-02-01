import { apiInterceptors }  from '../utils/apiInterceptors';
import { PROFILE_GET } from '../utils/variables/endpoint';

export const ProfileData = async() => {
    try {
        const response = await apiInterceptors(PROFILE_GET);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
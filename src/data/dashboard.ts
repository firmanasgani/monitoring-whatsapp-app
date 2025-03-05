import { apiInterceptors } from "../utils/apiInterceptors"
import { DASHBOARD_CHART_MESSAGE_GET, DASHBOARD_GET } from "../utils/variables/endpoint"

export const DashboardData = async() => {
    try {
        const response = await apiInterceptors(DASHBOARD_GET)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const DashboardMessageData = async() => {
    try {
        const response = await apiInterceptors(DASHBOARD_CHART_MESSAGE_GET)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
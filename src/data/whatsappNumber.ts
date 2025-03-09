import { apiInterceptors } from "../utils/apiInterceptors"
import { WHATSAPP_DELETE, WHATSAPP_GET_ALL, WHATSAPP_POST } from "../utils/variables/endpoint"

export const WhatsappNumberData = async(query: Record<string, string | number>) => {
    try {
        const response = await apiInterceptors(WHATSAPP_GET_ALL, {}, {}, query)
        return response.data
    }catch(error) {
        console.error(error)
    }
}

export const WhatsappDeleteData = async (id: string) => {
    try {
        const response = await apiInterceptors(WHATSAPP_DELETE, {}, {id: id})
        return response
    }catch(error: any) {
        console.error(error)
    }
}

export const WhatsappAddData = async(number: string) => {
    try {
        const response = await apiInterceptors(WHATSAPP_POST, {phone_number: number})
        return response
    }catch(error: any) {
        console.error(error)
    }
}
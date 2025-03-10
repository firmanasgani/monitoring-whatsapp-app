import { apiInterceptors } from "../utils/apiInterceptors"
import { TOKEN_API_GET_LIST,TOKEN_API_ADD_POST, TOKEN_API_INACTIVE_PUT, TOKEN_API_ACTIVE_PUT, TOKEN_API_DELETE } from "../utils/variables/endpoint"

export const ApiTokenData = async (query: Record<string, string | number>) => {
    try {
        const response = await apiInterceptors(TOKEN_API_GET_LIST, {}, {}, query)
        return response
    }catch(error: any) {
        console.error(error)
    }

}

export const ApiTokenDataPost = async (data: any) => {
    try {
        const response = await apiInterceptors(TOKEN_API_ADD_POST, data)
        return response
    }catch(error: any) {
        console.error(error)
    }
}

export const SetInactiveApiToken = async (id: string) => {
    try {
        const response = await apiInterceptors(TOKEN_API_INACTIVE_PUT, {}, {id: id})
        return response
    }catch(error: any) {
        console.error(error)
    }
}

export const SetActiveApiToken = async (id: string) => {
    try {
        const response = await apiInterceptors(TOKEN_API_ACTIVE_PUT, {}, {id: id
            })
        return response
    }catch(error: any) {
        console.error(error)
    }
}

export const ApiTokenDataDelete = async (id: string) => {
    try {
        const response = await apiInterceptors(TOKEN_API_DELETE, {}, {id: id})
        return response
    }catch(error: any) {
        console.error(error)
    }
}
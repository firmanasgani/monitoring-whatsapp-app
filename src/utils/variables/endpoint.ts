export type Endpoint = {
    url: string,
    methods: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}

const baseURL = process.env.REACT_APP_API_URL+'/api'

export const LOGIN_POST:Endpoint = {
    url: baseURL + '/users/login',
    methods: 'POST'
}
export const REGISTER_POST:Endpoint = {
    url: baseURL + '/users/register',
    methods: 'POST'
}

export const DASHBOARD_GET:Endpoint = {
    url: baseURL + '/dashboard',
    methods: 'GET'
}

export const PROFILE_GET:Endpoint = {
    url: baseURL + '/users/me',
    methods: 'GET'
}

export const PROFILE_UPDATE:Endpoint = {
    url: baseURL+'/users',
    methods: 'PUT'
}

export const USERS_DELETE:Endpoint = {
    url: baseURL+'/users',
    methods: 'DELETE'
}

export const WHATSAPP_GET_ALL:Endpoint = {
    url: baseURL+'/whatsapp',
    methods: 'GET'
}

export const WHATSAPP_GET_DETAIL: Endpoint = {
    url: baseURL+'/whatsapp/:id',
    methods: 'GET'
}

export const WHATSAPP_POST:Endpoint = {
    url: baseURL+'/whatsapp',
    methods: 'POST'
}

export const WHATSAPP_PUT:Endpoint = {
    url: baseURL+'/whatsapp/:id',
    methods: 'PUT'
}

export const WHATSAPP_DELETE:Endpoint = {
    url: baseURL+'/whatsapp/:id',
    methods: 'DELETE'
}




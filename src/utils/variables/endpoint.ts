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

export const MESSAGE_TEMPLATE_GET_ALL: Endpoint = {
    url: baseURL+'/message/template',
    methods: 'GET'
}

export const MESSAGE_TEMPLATE_POST: Endpoint = {
    url: baseURL+'/message/template',
    methods: 'POST'
}

export const MESSAGE_TEMPLATE_DELETE: Endpoint = {
    url: baseURL+'/message/template/:id',
    methods: 'DELETE'
}

export const MESSAGE_TEMPLATE_SEND_POST: Endpoint = {
    url: baseURL+'/messages',
    methods: 'POST' 
}

export const MESSAGE_TEMPLATE_CONTENT_SID_GET: Endpoint = {
    url: baseURL+'/message/template/contentsid/:id',
    methods: 'GET'
}

export const MESSAGE_FROM_DATABASE_GET: Endpoint = {
    url: baseURL+'/messages',
    methods: 'GET'
}

export const TOKEN_API_GET_LIST: Endpoint = {
    url: baseURL+'/openapi',
    methods: 'GET'
}

export const TOKEN_API_ADD_POST: Endpoint = {
    url: baseURL+'/openapi',
    methods: 'POST'
}

export const TOKEN_API_INACTIVE_PUT: Endpoint = {
    url: baseURL+'/openapi/:id',
    methods: 'PUT'
}

export const TOKEN_API_ACTIVE_PUT: Endpoint = {
    url: baseURL+'/openapi/set-active/:id',
    methods: 'PUT'
}

export const TOKEN_API_DELETE: Endpoint = {
    url: baseURL+'/openapi/:id',
    methods: 'DELETE'
}
import axios from "axios";
import { Endpoint } from "./variables/endpoint";
import { formaterURL } from "./helpers/urlFormatter";


export async function apiInterceptors (
  endpoint: Endpoint,
  body?: any,
  params?: Record<string, string | number>,
  query?: Record<string, string | number | boolean>
){
  const token = localStorage.getItem("access_token");
  const formatURL = formaterURL(endpoint.url, params, query);

  try {
    const response = await axios({
      url: formatURL,
      method: endpoint.methods,
      headers: {
        Authorization: token ?  `Bearer ${token}` : '',
        'Content-Type': 'application/json', 
      },
      data: body,
    })

    return response.data
  }catch(error: any){
    console.error(error)
  }


}

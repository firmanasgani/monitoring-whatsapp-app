import { apiInterceptors } from "../utils/apiInterceptors";
import {
  MESSAGE_TEMPLATE_DELETE,
  MESSAGE_TEMPLATE_GET_ALL,
  MESSAGE_TEMPLATE_POST,
  MESSAGE_TEMPLATE_CONTENT_SID_GET
} from "../utils/variables/endpoint";

export const MessageTemplateData = async (query?: Record<string, string | number>) => {
  try {
    const response = await apiInterceptors(MESSAGE_TEMPLATE_GET_ALL, {}, {}, query);
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};

export const MessageTemplateDataDelete = async (id: string) => {
  try {
    const response = await apiInterceptors(
      MESSAGE_TEMPLATE_DELETE,
      {},
      { id: id }
    );
    return response;
  } catch (error: any) {
    console.error(error);
  }
};

export const MessageTemplateDataPost = async(data: any) => {
    try {
        const response = await apiInterceptors(MESSAGE_TEMPLATE_POST, data)
        return response
    }catch(error: any){
        console.error(error)
    }
}

export const MessageTemplateDataContentSID = async (id: string) => {
  try {
    const response = await apiInterceptors(
        MESSAGE_TEMPLATE_CONTENT_SID_GET,
      {},
      { id: id }
    );
    return response;
  } catch (error: any) {
    console.error(error);
  }
}

export const MessageTemplateDataTesting = async(data: any) => {
    try {
        const response = await apiInterceptors(MESSAGE_TEMPLATE_POST, data)
        return response
    }catch(error: any){
        console.error(error)
    }
}
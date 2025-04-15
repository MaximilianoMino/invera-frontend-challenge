import axios from 'axios';

export type APIRequestResult<T = undefined> = {
  hasError: boolean;
  errorMessage?: string;
  data?: T;
  status: number;
};

const baseApi = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const useBaseApiClient = () => {
  const getRequest = async <T>(url: string, params?: unknown): Promise<APIRequestResult<T>> => {
    try {
      const response = await baseApi.get<T>(url, { params });
      return {
        hasError: false,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        hasError: true,
        errorMessage: error?.response?.data?.message || 'Unknown error',
        status: error?.response?.status || 500,
      };
    }
  };

  const postRequest = async <T, B = unknown>(
    url: string,
    body: B,
  ): Promise<APIRequestResult<T>> => {
    try {
      const response = await baseApi.post<T>(url, body);
      return {
        hasError: false,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        hasError: true,
        errorMessage: error?.response?.data?.message || 'Unknown error',
        status: error?.response?.status || 500,
      };
    }
  };

  const putRequest = async <T, B = unknown>(url: string, body: B): Promise<APIRequestResult<T>> => {
    try {
      const response = await baseApi.put<T>(url, body);
      return {
        hasError: false,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        hasError: true,
        errorMessage: error?.response?.data?.message || 'Unknown error',
        status: error?.response?.status || 500,
      };
    }
  };

  const delRequest = async <T>(url: string): Promise<APIRequestResult<T>> => {
    try {
      const response = await baseApi.get<T>(url);
      return {
        hasError: false,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        hasError: true,
        errorMessage: error?.response?.data?.message || 'Unknown error',
        status: error?.response?.status || 500,
      };
    }
  };

  return { getRequest, postRequest, putRequest, delRequest };
};


import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosServiceArgs {
  endpoint: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  body?: any;
  token?: string | null;
}

interface AxiosServiceReturn<T> {
  data: T | null;
  error: any;
  loading: boolean;
}

const axiosService = async <T>({ endpoint, method = 'GET', body = null, token = null }: AxiosServiceArgs): Promise<AxiosServiceReturn<T>> => {
  let data: T | null = null;
  let error: any = null;
  let loading = true;

  const baseUrl = "http://localhost:8080";

  try {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: baseUrl + endpoint,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      data: body,
    };

    const response: AxiosResponse<T> = await axios(axiosConfig);
    data = response.data;
    loading = false;
  } catch (err: any) {
    error = err || err.message;
    loading = false;
  }

  return { data, error, loading };
};

export default axiosService;

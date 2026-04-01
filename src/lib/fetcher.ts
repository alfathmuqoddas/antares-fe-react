import api from "./api";
import { AxiosRequestConfig } from "axios";

export interface FetcherOptions extends AxiosRequestConfig {
  useAuth?: boolean;
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {},
): Promise<T> => {
  const { useAuth = true, ...config } = options;

  const response = await api.request<T>({
    url,
    ...config,
    headers: {
      ...config.headers,
      "x-use-auth": String(useAuth),
    },
  });

  return response.data;
};

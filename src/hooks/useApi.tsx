import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "../lib/fetcher";

interface UseApiOptions<TData, TError> extends SWRConfiguration<TData, TError> {
  useAuth?: boolean;
  params?: Record<string, any>; // Support for query params
  onSuccess?: (data: TData) => void;
  onError?: (err: TError) => void;
}

export function useApi<TData = any, TError = any>(
  url: string | null,
  options: UseApiOptions<TData, TError> = {},
) {
  const { useAuth = true, params, onSuccess, onError, ...swrConfig } = options;

  return useSWR<TData, TError>(
    url ? [url, params] : null,
    ([url, params]: [string, any]) => fetcher<TData>(url, { useAuth, params }),
    {
      ...swrConfig,
      onSuccess: (data, key, config) => {
        onSuccess?.(data);
        (swrConfig as any).onSuccess?.(data, key, config);
      },
      onError: (err, key, config) => {
        onError?.(err);
        (swrConfig as any).onError?.(err, key, config);
      },
    },
  );
}

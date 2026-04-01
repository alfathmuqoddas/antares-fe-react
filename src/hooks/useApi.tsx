import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "../lib/fetcher";

interface UseApiOptions<TData, TError> extends SWRConfiguration<TData, TError> {
  useAuth?: boolean;
  onSuccess?: (data: TData) => void; // simple version
  onError?: (err: TError) => void;
}

export function useApi<TData = any, TError = any>(
  url: string | null,
  options: UseApiOptions<TData, TError> = {},
) {
  const { useAuth = true, onSuccess, onError, ...swrConfig } = options;

  return useSWR<TData, TError>(
    url,
    (url: string) => fetcher<TData>(url, { useAuth }),
    {
      ...swrConfig,
      onSuccess: (data, key, config) => {
        onSuccess?.(data); // your simple callback
        (swrConfig as SWRConfiguration<TData, TError>).onSuccess?.(
          data,
          key,
          config,
        );
      },
      onError: (err, key, config) => {
        onError?.(err);
        (swrConfig as SWRConfiguration<TData, TError>).onError?.(
          err,
          key,
          config,
        );
      },
    },
  );
}

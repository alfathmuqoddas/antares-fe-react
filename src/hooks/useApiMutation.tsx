import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { fetcher } from "../lib/fetcher";

interface MutationOptions<
  TData,
  TError,
  TVariables,
> extends SWRMutationConfiguration<TData, TError, string, TVariables> {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  useAuth?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (err: TError) => void;
}

export function useApiMutation<TData = any, TError = any, TVariables = any>(
  key: string,
  options: MutationOptions<TData, TError, TVariables> = {},
) {
  const {
    method = "POST",
    useAuth = true,
    onSuccess: simpleOnSuccess,
    onError: simpleOnError,
    ...mutationConfig
  } = options;

  return useSWRMutation<TData, TError, string, TVariables>(
    key,
    async (url, { arg }) => {
      return fetcher<TData>(url, {
        method,
        useAuth,
        data: arg,
      });
    },
    {
      ...mutationConfig,
      onSuccess: (data, key, config) => {
        simpleOnSuccess?.(data);
        (mutationConfig as any).onSuccess?.(data, key, config);
      },
      onError: (err, key, config) => {
        simpleOnError?.(err);
        (mutationConfig as any).onError?.(err, key, config);
      },
    },
  );
}

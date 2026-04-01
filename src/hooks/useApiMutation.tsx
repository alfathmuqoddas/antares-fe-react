import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { fetcher } from "../lib/fetcher";

interface MutationOptions<
  TData,
  TError,
  TVariables,
> extends SWRMutationConfiguration<TData, TError, string, TVariables> {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  useAuth?: boolean;
  onSuccess?: (data: TData) => void; // simple callback
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

  return useSWRMutation<TData, TError, string | null, TVariables>(
    key,
    async (urlKey, { arg }) => {
      const finalUrl = typeof arg === "string" ? arg : urlKey;

      if (!finalUrl) throw new Error("Missing URL for mutation");

      const body = typeof arg === "string" ? undefined : arg;

      return fetcher<TData>(finalUrl, {
        method,
        useAuth,
        body,
      });
    },
    {
      ...mutationConfig,
      onSuccess: (data, key, config) => {
        simpleOnSuccess?.(data); // your simple version
        (
          mutationConfig as SWRMutationConfiguration<any, any, any, any>
        ).onSuccess?.(data, key, config);
      },
      onError: (err, key, config) => {
        simpleOnError?.(err);
        (
          mutationConfig as SWRMutationConfiguration<any, any, any, any>
        ).onError?.(err, key, config);
      },
    },
  );
}

import useAuthStore from "@/store/useAuth";

export interface FetcherOptions extends RequestInit {
  useAuth?: boolean;
  body?: any;
}

const BASE_URL = import.meta.env.VITE_API_BASE;

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {},
): Promise<T> => {
  const { useAuth = true, body, ...customConfig } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customConfig.headers as Record<string, string>),
  };

  if (useAuth) {
    const { user } = useAuthStore.getState();
    const token = user?.accessToken;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...customConfig,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || "An error occurred while fetching the data.",
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};

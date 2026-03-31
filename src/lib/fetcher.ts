import useAuth from "@/store/useAuth";

export const fetcher = async (url: string, options?: RequestInit) => {
  const { user } = useAuth.getState();
  const token = user?.accessToken;
  const isInternalRequest = url.startsWith(import.meta.env.VITE_API_BASE);

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  if (token && isInternalRequest) {
    headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(
      errorData.message || `Error ${res.status}: ${res.statusText}`,
    );
    throw error;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

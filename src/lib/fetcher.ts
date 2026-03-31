import useAuth from "@/store/useAuth";

export const fetcher = async (url: string, options?: RequestInit) => {
  const { user } = useAuth.getState();
  const token = user?.accessToken;
  console.log({ token });

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

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

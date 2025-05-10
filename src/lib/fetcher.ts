export const fetcher = async (url: string, options?: RequestInit) => {
  console.log(`Workspaceing: ${url} with options:`, options); // Log for demonstration
  const res = await fetch(url, options);

  if (!res.ok) {
    // You might want to parse the error response body as well
    const errorText = await res.text();
    const error = new Error(
      `An error occurred while fetching the data: ${res.status} ${res.statusText}`
    );
    // You can attach additional info to the error object
    // error.info = errorText;
    // error.status = res.status;
    throw error;
  }

  // Check for empty response body before parsing JSON
  const text = await res.text();
  return text ? JSON.parse(text) : null; // Or handle empty response appropriately
};

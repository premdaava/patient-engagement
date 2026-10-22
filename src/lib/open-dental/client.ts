export async function openDentalFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.OPEN_DENTAL_BASE_URL || process.env.OPEN_DENTAL_API_BASE_URL || "https://api.opendental.com/api/v1/";
  const developerKey = process.env.OPEN_DENTAL_DEVELOPER_KEY;
  const customerKey = process.env.OPEN_DENTAL_CUSTOMER_KEY;

  if (!developerKey || !customerKey) {
    throw new Error("Open Dental API keys (developer and customer keys) are not configured in environment variables.");
  }

  const url = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const authHeader = `ODFHIR ${developerKey}/${customerKey}`;

  console.log(`[OpenDental API] Request URL: ${url}`);
  console.log(`[OpenDental API] Authorization Header: ${authHeader}`);

  const headers: Record<string, string> = {
    "Authorization": authHeader,
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Open Dental API error (${response.status}) for ${url}: ${errorText || response.statusText}`);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return {} as T;
  }

  return response.json() as Promise<T>;
}





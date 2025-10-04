// Secure API key management
// This approach fetches the API key from your server instead of exposing it in client code

interface ApiKeysResponse {
  googleMapsApiKey: string;
}

// Fetch API key from your server (most secure approach)
export async function getGoogleMapsApiKey(): Promise<string> {
  try {
    // This would call your backend API to get the key
    const response = await fetch('/api/keys/google-maps');
    if (!response.ok) {
      throw new Error('Failed to fetch API key');
    }
    const data: ApiKeysResponse = await response.json();
    return data.googleMapsApiKey;
  } catch (error) {
    console.error('Error fetching Google Maps API key:', error);
    // Fallback to environment variable (less secure but functional)
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  }
}

// Alternative: Use a serverless function to proxy the API key
export async function getGoogleMapsApiKeyFromFunction(): Promise<string> {
  try {
    const response = await fetch('/api/get-maps-key');
    if (!response.ok) {
      throw new Error('Failed to fetch API key from function');
    }
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error('Error fetching API key from function:', error);
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  }
}

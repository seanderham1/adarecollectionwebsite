// Secure environment configuration
// This file loads environment variables at runtime to prevent them from being exposed in the build

interface EnvConfig {
  VITE_GA_MEASUREMENT_ID: string;
  VITE_GOOGLE_MAPS_API_KEY: string;
  VITE_GOOGLE_SITE_VERIFICATION: string;
}

// Load environment variables at runtime
function loadEnvConfig(): EnvConfig {
  // Google Maps API key is public but domain-restricted for security
  // GA and Search Console keys are kept secure
  return {
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    VITE_GOOGLE_SITE_VERIFICATION: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  };
}

export const env = loadEnvConfig();

// Validation function to ensure required environment variables are present
export function validateEnv(): void {
  const required = ['VITE_GA_MEASUREMENT_ID', 'VITE_GOOGLE_MAPS_API_KEY', 'VITE_GOOGLE_SITE_VERIFICATION'];
  
  for (const key of required) {
    if (!env[key as keyof EnvConfig]) {
      console.warn(`Environment variable ${key} is not set`);
    }
  }
}

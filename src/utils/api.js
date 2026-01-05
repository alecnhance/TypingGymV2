// Get API base URL from environment variable, or use relative path in dev
// In production (Railway), set VITE_API_URL to your backend URL
// In development, this will be empty string so Vite proxy handles it
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';


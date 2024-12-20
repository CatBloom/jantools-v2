import axios from 'axios';
import axiosRetry from 'axios-retry';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(apiClient, {
  retries: 10,
  retryCondition: () => true,
  retryDelay: (retryCount) => {
    return Math.min(retryCount * 2000, 10000);
  },
});

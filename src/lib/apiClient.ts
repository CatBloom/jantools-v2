import axios from 'axios';
import axiosRetry from 'axios-retry';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リトライを除外するpath
const excludedPaths = ['/auth'];
axiosRetry(apiClient, {
  retries: 10,
  retryCondition: (error) => {
    const config = error.config;
    if (!config) return false;
    const isExcludedPath = excludedPaths.some((path) => config.url?.includes(path));
    return !isExcludedPath;
  },
  retryDelay: (retryCount) => {
    return Math.min(retryCount * 2000, 10000);
  },
});

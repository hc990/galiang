// app/lib/axios.js
import axios from 'axios';
import siteMetadata from '@/data/siteMetadata';
import axiosRetry from 'axios-retry';

const axiosInstance = axios.create({
  baseURL: siteMetadata.siteUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosRetry(axiosInstance, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export default axiosInstance;
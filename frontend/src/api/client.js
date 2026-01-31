import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with error
            const message = error.response.data?.detail || 'An error occurred';
            toast.error(message);
        } else if (error.request) {
            // Request made but no response
            toast.error('Unable to connect to server. Please check your connection.');
        } else {
            // Something else happened
            toast.error('An unexpected error occurred');
        }
        return Promise.reject(error);
    }
);

export default apiClient;

import axios from 'axios';
import { MOCK_EXERCISES, MOCK_ROUTINES, MOCK_USER } from '../utils/mockData';

const isDemoMode = import.meta.env.VITE_DEMO === 'true' || window.location.hostname.includes('github.io');

const api = axios.create({
    baseURL: isDemoMode ? '#' : 'http://localhost:8001/api/',
});

// Mocking logic for demo mode
if (isDemoMode) {
    api.interceptors.request.use(async (config) => {
        // Intercept all requests in demo mode
        console.log(`Demo Mode Request: ${config.method.toUpperCase()} ${config.url}`);

        // Mock responses helper
        const mockResponse = (data) => {
            return {
                data,
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
            };
        };

        if (config.url === 'token/' && config.method === 'post') {
            return Promise.reject({ response: mockResponse({ access: 'mock-access-token', refresh: 'mock-refresh-token' }) });
        }

        if (config.url === 'workouts/routines/' && config.method === 'get') {
            return Promise.reject({ response: mockResponse(MOCK_ROUTINES) });
        }

        if (config.url === 'workouts/exercises/' && config.method === 'get') {
            return Promise.reject({ response: mockResponse(MOCK_EXERCISES) });
        }

        return config;
    });

    // Special handling for the rejected promises above to make them look like successful responses
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isDemoMode && error.response) {
                return Promise.resolve(error.response);
            }
            return Promise.reject(error);
        }
    );
} else {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refresh_token');
                    const response = await axios.post('http://localhost:8001/api/token/refresh/', {
                        refresh: refreshToken
                    });
                    const { access } = response.data;
                    localStorage.setItem('access_token', access);
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    return api(originalRequest);
                } catch (err) {
                    console.error("Token refresh failed", err);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
}

export default api;

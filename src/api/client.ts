import axios, {AxiosError, type AxiosRequestConfig} from 'axios';
import {useAuthStore} from "../stores/auth.ts";

// const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
const baseUrl = "http://0.0.0.0:9881/api/v1"

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const auth = useAuthStore();
            auth.signOut();
        }
        return Promise.reject(error)
    }
)

type ApiErrorBody = {
    detail?: unknown;
    message?: unknown;
};

function normalizeErrorMessage(detail: unknown, fallback: string) {
    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => {
                if (typeof item === "string") {
                    return item;
                }

                if (item && typeof item === "object" && "msg" in item) {
                    return String((item as { msg?: unknown }).msg ?? "");
                }

                return JSON.stringify(item);
            })
            .filter(Boolean)
            .join(", ") || fallback;
    }

    if (detail && typeof detail === "object") {
        return JSON.stringify(detail);
    }

    return fallback;
}


export async function requestJson<T>(path: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
        const response = await api({
            url: `${baseUrl}${path}`,
            method: config.method || 'GET',
            ...config,
            headers: {
                "Content-Type": "application/json",
                ...(config.headers ?? {}),
            },
        });

        if (response.status === 204) {
            return undefined as T;
        }

        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            let message = `Request failed with status ${axiosError.response?.status ?? 'unknown'}`;

            try {
                const body = axiosError.response?.data as ApiErrorBody;
                if (body) {
                    message = normalizeErrorMessage(body.detail ?? body.message, message);
                }
            } catch {
                // ignore non-json error bodies
            }

            throw new Error(message);
        }

        throw error;
    }
}
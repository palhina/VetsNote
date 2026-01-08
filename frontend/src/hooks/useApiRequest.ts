import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

type HttpMethod = "GET" | "POST";

interface RequestOptions {
  method?: HttpMethod;
  body?: Record<string, unknown>;
}

interface UseApiRequestResult<T> {
  execute: (endpoint: string, options?: RequestOptions) => Promise<T>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useApiRequest = <T = unknown>(): UseApiRequestResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (endpoint: string, options: RequestOptions = {}): Promise<T> => {
      const { method = "POST", body } = options;
      setError(null);
      setIsLoading(true);

      try {
        // CSRF Cookie取得
        let xsrfToken: string | null = null;
        if (method === "POST") {
          const csrfResponse = await fetch(
            `${API_BASE_URL}/sanctum/csrf-cookie`,
            {
              credentials: "include",
            }
          );

          if (!csrfResponse.ok) {
            throw new Error("CSRFトークンの取得に失敗しました");
          }

          xsrfToken = getCookie("XSRF-TOKEN");
        }

        // APIリクエスト
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(xsrfToken && { "X-XSRF-TOKEN": xsrfToken }),
          },
          ...(body && { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || "リクエストに失敗しました");
        }

        // 空レスポンス（204 No Content）の場合
        const text = await response.text();
        return text ? JSON.parse(text) : ({} as T);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "リクエストに失敗しました";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { execute, isLoading, error, clearError };
};

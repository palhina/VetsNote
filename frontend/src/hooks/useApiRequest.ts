import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

interface UseApiRequestResult<T> {
  execute: (endpoint: string, body: Record<string, unknown>) => Promise<T>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useApiRequest = <T = unknown>(): UseApiRequestResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (endpoint: string, body: Record<string, unknown>): Promise<T> => {
      setError(null);
      setIsLoading(true);

      try {
        // CSRF Cookie 取得
        const csrfResponse = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        if (!csrfResponse.ok) {
          throw new Error("CSRFトークンの取得に失敗しました");
        }

        // クッキーからXSRF-TOKENを取得
        const xsrfToken = getCookie("XSRF-TOKEN");

        // APIリクエスト
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(xsrfToken && { "X-XSRF-TOKEN": xsrfToken }),
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || "リクエストに失敗しました");
        }

        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : "リクエストに失敗しました";
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

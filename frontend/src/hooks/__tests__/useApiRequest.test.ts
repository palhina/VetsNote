import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useApiRequest } from "../useApiRequest";

describe("useApiRequest", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    // CSRFトークン用のcookieをモック
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "XSRF-TOKEN=test-token",
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("初期状態が正しい", () => {
    const { result } = renderHook(() => useApiRequest());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("GETリクエストが正しく実行される", async () => {
    const mockResponse = { data: "test" };
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
    });

    const { result } = renderHook(() => useApiRequest<{ data: string }>());

    let response;
    await act(async () => {
      response = await result.current.execute("/api/test", { method: "GET" });
    });

    expect(response).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/test"),
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("POSTリクエストがCSRFトークンを取得してから実行される", async () => {
    const mockResponse = { success: true };
    global.fetch = vi
      .fn()
      // CSRF cookieリクエスト
      .mockResolvedValueOnce({
        ok: true,
      })
      // 実際のAPIリクエスト
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

    const { result } = renderHook(() => useApiRequest<{ success: boolean }>());

    await act(async () => {
      await result.current.execute("/api/login", {
        method: "POST",
        body: { email: "test@example.com" },
      });
    });

    // CSRFとAPIの2回呼ばれる
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("エラーレスポンスを正しく処理する", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Bad Request" }),
    });

    const { result } = renderHook(() => useApiRequest());

    await act(async () => {
      try {
        await result.current.execute("/api/test", { method: "GET" });
      } catch {
        // エラーを期待
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Bad Request");
    });
  });

  it("バリデーションエラーを正しく処理する", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          errors: {
            email: ["メールアドレスは必須です"],
            password: ["パスワードは必須です"],
          },
        }),
    });

    const { result } = renderHook(() => useApiRequest());

    await act(async () => {
      try {
        await result.current.execute("/api/test", { method: "GET" });
      } catch {
        // エラーを期待
      }
    });

    await waitFor(() => {
      expect(result.current.error).toContain("メールアドレスは必須です");
      expect(result.current.error).toContain("パスワードは必須です");
    });
  });

  it("clearErrorでエラーをクリアできる", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Error" }),
    });

    const { result } = renderHook(() => useApiRequest());

    await act(async () => {
      try {
        await result.current.execute("/api/test", { method: "GET" });
      } catch {
        // エラーを期待
      }
    });

    expect(result.current.error).toBe("Error");

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});

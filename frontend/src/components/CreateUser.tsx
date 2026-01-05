import { memo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

// クッキーから特定の値を取得するヘルパー関数
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export const CreateUser = memo(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // ① Sanctum CSRF Cookie 取得
      const csrfResponse = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      if (!csrfResponse.ok) {
        throw new Error("CSRFトークンの取得に失敗しました");
      }

      // ② クッキーからXSRF-TOKENを取得
      const xsrfToken = getCookie("XSRF-TOKEN");

      // ③ ユーザー作成
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(xsrfToken && { "X-XSRF-TOKEN": xsrfToken }),
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "ユーザー作成に失敗しました");
      }

      setName("");
      setEmail("");
      setPassword("");
      alert("ユーザーを作成しました");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "ユーザー作成に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>User Create</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "送信中..." : "送信"}
        </button>
      </form>
    </div>
  );
});

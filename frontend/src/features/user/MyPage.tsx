import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { useApiRequest } from "../../hooks/useApiRequest";

export const MyPage = memo(() => {
  const { user } = useAuth();
  const { execute, isLoading, error, clearError } = useApiRequest<{
    message: string;
  }>();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage("");

    try {
      const response = await execute("/api/password", {
        method: "PUT",
        body: {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
      });
      setSuccessMessage(response.message);
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch {
      // エラーはuseApiRequestで処理される
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0 }}>マイページ</h1>
        <Link
          to="/"
          style={{
            padding: "8px 16px",
            backgroundColor: "#666",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          ホームに戻る
        </Link>
      </div>

      {/* ユーザー情報 */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>ユーザー情報</h2>
        <div style={{ marginBottom: "12px" }}>
          <strong>名前:</strong> {user?.name}
        </div>
        <div>
          <strong>メールアドレス:</strong> {user?.email}
        </div>
      </div>

      {/* パスワード変更 */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>パスワード変更</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            {successMessage}
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "16px",
              whiteSpace: "pre-line",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleChangePassword}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="currentPassword"
              style={{ display: "block", marginBottom: "4px" }}
            >
              現在のパスワード
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="newPassword"
              style={{ display: "block", marginBottom: "4px" }}
            >
              新しいパスワード
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            <small style={{ color: "#666" }}>8文字以上</small>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="newPasswordConfirmation"
              style={{ display: "block", marginBottom: "4px" }}
            >
              新しいパスワード（確認）
            </label>
            <input
              type="password"
              id="newPasswordConfirmation"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              required
              minLength={8}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {isLoading ? "変更中..." : "パスワードを変更"}
          </button>
        </form>
      </div>
    </div>
  );
});

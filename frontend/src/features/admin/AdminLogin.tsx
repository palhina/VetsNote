import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useAuth } from "../auth";
import type { User } from "../../types";

interface AdminLoginResponse {
  message: string;
  user: User;
}

export const AdminLogin = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { execute, isLoading, error } = useApiRequest<AdminLoginResponse>();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await execute("/api/admin/login", {
        method: "POST",
        body: { email, password },
      });

      setUser(response.user);
      navigate("/admin");
    } catch {
      // error is handled by useApiRequest
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
});

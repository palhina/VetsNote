import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

export const AdminCreate = memo(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("admin");
  const navigate = useNavigate();
  const { execute, isLoading, error } = useApiRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await execute("/api/admin/users", {
        method: "POST",
        body: { name, email, password, role },
      });
      alert("User created successfully");
      navigate("/admin/users");
    } catch {
      // error is handled by useApiRequest
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h1>Create New User</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "15px", whiteSpace: "pre-wrap" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
});

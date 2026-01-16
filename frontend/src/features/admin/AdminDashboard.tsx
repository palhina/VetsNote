import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

interface Statistics {
  total_users: number;
  total_patient_cases: number;
  total_seminar_notes: number;
}

export const AdminDashboard = memo(() => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const { execute, isLoading, error } = useApiRequest<Statistics>();
  const { execute: logoutExecute } = useApiRequest();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await execute("/api/admin/statistics", {
          method: "GET",
        });
        setStats(response);
      } catch {
        // error is handled by useApiRequest
      }
    };

    fetchStats();
  }, [execute]);

  const handleLogout = async () => {
    try {
      await logoutExecute("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <nav style={{ marginBottom: "30px" }}>
        <Link
          to="/admin/users"
          style={{
            marginRight: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
          }}
        >
          User Management
        </Link>
        <Link
          to="/admin/data"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
          }}
        >
          Data Viewer
        </Link>
      </nav>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading ? (
        <p>Loading statistics...</p>
      ) : stats ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Users</h3>
            <p style={{ fontSize: "2em", margin: 0, fontWeight: "bold" }}>
              {stats.total_users}
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>
              Patient Cases
            </h3>
            <p style={{ fontSize: "2em", margin: 0, fontWeight: "bold" }}>
              {stats.total_patient_cases}
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>
              Seminar Notes
            </h3>
            <p style={{ fontSize: "2em", margin: 0, fontWeight: "bold" }}>
              {stats.total_seminar_notes}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
});

import { memo, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import type { User } from "../../types";

interface UserWithCounts extends User {
  patient_cases_count: number;
  seminar_notes_count: number;
}

interface UsersResponse {
  users: UserWithCounts[];
}

export const UserManagement = memo(() => {
  const [users, setUsers] = useState<UserWithCounts[]>([]);
  const [editingUser, setEditingUser] = useState<UserWithCounts | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const { execute, isLoading, error } = useApiRequest<UsersResponse>();
  const {
    execute: executeUpdate,
    isLoading: isUpdating,
    error: updateError,
  } = useApiRequest();
  const {
    execute: executeDelete,
    isLoading: isDeleting,
    error: deleteError,
  } = useApiRequest();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await execute("/api/admin/users", { method: "GET" });
      setUsers(response.users);
    } catch {
      // error is handled by useApiRequest
    }
  }, [execute]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: UserWithCounts) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", role: "" });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      await executeUpdate(`/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        body: editForm,
      });
      setEditingUser(null);
      fetchUsers();
    } catch {
      // error is handled by useApiRequest
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await executeDelete(`/api/admin/users/${userId}`, { method: "DELETE" });
      fetchUsers();
    } catch {
      // error is handled by useApiRequest
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>User Management</h1>
        <Link
          to="/admin"
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            textDecoration: "none",
          }}
        >
          Back to Dashboard
        </Link>
      </div>

      {(error || updateError || deleteError) && (
        <p style={{ color: "red" }}>{error || updateError || deleteError}</p>
      )}

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Role</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Cases</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Notes</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{user.id}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      style={{ width: "100%" }}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      style={{ width: "100%" }}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {editingUser?.id === user.id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor:
                          user.role === "admin" ? "#dc3545" : "#28a745",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      {user.role}
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {user.patient_cases_count}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {user.seminar_notes_count}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {editingUser?.id === user.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        disabled={isUpdating}
                        style={{
                          marginRight: "5px",
                          padding: "5px 10px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        style={{
                          marginRight: "5px",
                          padding: "5px 10px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={isDeleting}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

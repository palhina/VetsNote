import { memo, useEffect, useState, useCallback } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Inline } from "../../components/layout/Container";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableWrapper,
  Button,
  Input,
  Select,
  LinkButton,
  Badge,
  Loading,
  ErrorMessage,
} from "../../components/ui";
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

  const combinedError = error || updateError || deleteError;

  return (
    <PageLayout
      title="User Management"
      actions={
        <LinkButton to="/admin" variant="secondary">
          Back to Dashboard
        </LinkButton>
      }
    >
      {combinedError && <ErrorMessage message={combinedError} />}

      {isLoading ? (
        <Loading />
      ) : (
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Cases</Th>
                <Th>Notes</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <Input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <Select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </Select>
                    ) : (
                      <Badge
                        variant={user.role === "admin" ? "danger" : "success"}
                      >
                        {user.role}
                      </Badge>
                    )}
                  </Td>
                  <Td>{user.patient_cases_count}</Td>
                  <Td>{user.seminar_notes_count}</Td>
                  <Td>
                    {editingUser?.id === user.id ? (
                      <Inline $gap={2}>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isUpdating}
                          isLoading={isUpdating}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </Inline>
                    ) : (
                      <Inline $gap={2}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </Button>
                      </Inline>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
    </PageLayout>
  );
});

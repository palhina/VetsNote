import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Stack } from "../../components/layout/Container";
import { Card } from "../../components/layout/Card";
import {
  Button,
  Input,
  Select,
  Label,
  FormField,
  ErrorMessage,
} from "../../components/ui";

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
    <PageLayout title="Create New User" narrow>
      <Card>
        <form onSubmit={handleSubmit}>
          <Stack $gap={4}>
            <FormField>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </FormField>

            <FormField>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </Select>
            </FormField>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              loadingText="Creating..."
            >
              Create User
            </Button>
          </Stack>
        </form>
      </Card>
    </PageLayout>
  );
});

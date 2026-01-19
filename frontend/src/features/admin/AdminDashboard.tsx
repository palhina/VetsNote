import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Inline } from "../../components/layout/Container";
import {
  Button,
  LinkButton,
  StatCard,
  Loading,
  ErrorMessage,
} from "../../components/ui";

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
        // errorハンドリングはuseApiRequest
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
    <PageLayout
      title="管理者画面"
      actions={
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      }
    >
      <Inline $gap={4}>
        <LinkButton to="/admin/users" variant="secondary">
          User Management
        </LinkButton>
        <LinkButton to="/admin/data" variant="primary">
          Data Viewer
        </LinkButton>
      </Inline>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <Loading />
      ) : stats ? (
        <Inline $gap={4}>
          <StatCard label="Users" value={stats.total_users} />
          <StatCard label="Patient Cases" value={stats.total_patient_cases} />
          <StatCard label="Seminar Notes" value={stats.total_seminar_notes} />
        </Inline>
      ) : null}
    </PageLayout>
  );
});

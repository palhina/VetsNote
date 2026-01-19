import { memo, useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Inline } from "../../components/layout/Container";
import {
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

  return (
    <PageLayout title="管理者画面">
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

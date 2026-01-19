import { memo, useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import {
  TabList,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableWrapper,
  LinkButton,
  Loading,
  ErrorMessage,
} from "../../components/ui";
import type { PatientCase, SeminarNote, User } from "../../types";

interface PatientCaseWithUser extends PatientCase {
  user: Pick<User, "id" | "name" | "email">;
}

interface SeminarNoteWithUser extends SeminarNote {
  user: Pick<User, "id" | "name" | "email">;
}

interface PatientCasesResponse {
  patient_cases: PatientCaseWithUser[];
}

interface SeminarNotesResponse {
  seminar_notes: SeminarNoteWithUser[];
}

type TabType = "patient-cases" | "seminar-notes";

export const DataViewer = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>("patient-cases");
  const [patientCases, setPatientCases] = useState<PatientCaseWithUser[]>([]);
  const [seminarNotes, setSeminarNotes] = useState<SeminarNoteWithUser[]>([]);
  const { execute: executeCases, isLoading: loadingCases, error: casesError } =
    useApiRequest<PatientCasesResponse>();
  const { execute: executeNotes, isLoading: loadingNotes, error: notesError } =
    useApiRequest<SeminarNotesResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "patient-cases") {
        try {
          const response = await executeCases("/api/admin/patient-cases", {
            method: "GET",
          });
          setPatientCases(response.patient_cases);
        } catch {
          // error is handled by useApiRequest
        }
      } else {
        try {
          const response = await executeNotes("/api/admin/seminar-notes", {
            method: "GET",
          });
          setSeminarNotes(response.seminar_notes);
        } catch {
          // error is handled by useApiRequest
        }
      }
    };

    fetchData();
  }, [activeTab, executeCases, executeNotes]);

  const isLoading = loadingCases || loadingNotes;
  const error = casesError || notesError;

  return (
    <PageLayout
      title="Data Viewer"
      actions={
        <LinkButton to="/admin" variant="secondary">
          Back to Dashboard
        </LinkButton>
      }
    >
      <TabList>
        <Tab
          isActive={activeTab === "patient-cases"}
          onClick={() => setActiveTab("patient-cases")}
        >
          Patient Cases
        </Tab>
        <Tab
          isActive={activeTab === "seminar-notes"}
          onClick={() => setActiveTab("seminar-notes")}
        >
          Seminar Notes
        </Tab>
      </TabList>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <Loading />
      ) : activeTab === "patient-cases" ? (
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>User</Th>
                <Th>Animal</Th>
                <Th>Breed</Th>
                <Th>Chief Complaint</Th>
                <Th>Diagnosis</Th>
                <Th>Created</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patientCases.map((pc) => (
                <Tr key={pc.id}>
                  <Td>{pc.id}</Td>
                  <Td>{pc.user?.name || "Unknown"}</Td>
                  <Td>{pc.animal_type}</Td>
                  <Td>{pc.breed || "-"}</Td>
                  <Td>
                    {pc.chief_complaint
                      ? pc.chief_complaint.substring(0, 50) + "..."
                      : "-"}
                  </Td>
                  <Td>
                    {pc.diagnosis ? pc.diagnosis.substring(0, 50) + "..." : "-"}
                  </Td>
                  <Td>{new Date(pc.created_at).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      ) : (
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>User</Th>
                <Th>Seminar Name</Th>
                <Th>Held On</Th>
                <Th>Lecturer</Th>
                <Th>Theme</Th>
                <Th>Created</Th>
              </Tr>
            </Thead>
            <Tbody>
              {seminarNotes.map((sn) => (
                <Tr key={sn.id}>
                  <Td>{sn.id}</Td>
                  <Td>{sn.user?.name || "Unknown"}</Td>
                  <Td>{sn.seminar_name}</Td>
                  <Td>{sn.held_on}</Td>
                  <Td>{sn.lecturer || "-"}</Td>
                  <Td>{sn.theme || "-"}</Td>
                  <Td>{new Date(sn.created_at).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
    </PageLayout>
  );
});

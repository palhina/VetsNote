import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
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
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Data Viewer</h1>
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

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("patient-cases")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor:
              activeTab === "patient-cases" ? "#007bff" : "#e9ecef",
            color: activeTab === "patient-cases" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Patient Cases
        </button>
        <button
          onClick={() => setActiveTab("seminar-notes")}
          style={{
            padding: "10px 20px",
            backgroundColor:
              activeTab === "seminar-notes" ? "#007bff" : "#e9ecef",
            color: activeTab === "seminar-notes" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Seminar Notes
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading ? (
        <p>Loading data...</p>
      ) : activeTab === "patient-cases" ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>User</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Animal</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Breed</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Chief Complaint</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Diagnosis</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {patientCases.map((pc) => (
              <tr key={pc.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{pc.id}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {pc.user?.name || "Unknown"}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{pc.animal_type}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{pc.breed || "-"}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {pc.chief_complaint
                    ? pc.chief_complaint.substring(0, 50) + "..."
                    : "-"}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {pc.diagnosis ? pc.diagnosis.substring(0, 50) + "..." : "-"}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {new Date(pc.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>User</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Seminar Name</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Held On</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Lecturer</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Theme</th>
              <th style={{ padding: "12px", textAlign: "left", border: "1px solid #dee2e6" }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {seminarNotes.map((sn) => (
              <tr key={sn.id}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{sn.id}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {sn.user?.name || "Unknown"}
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{sn.seminar_name}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{sn.held_on}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{sn.lecturer || "-"}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{sn.theme || "-"}</td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  {new Date(sn.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

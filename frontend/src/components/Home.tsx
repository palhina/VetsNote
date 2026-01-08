import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useApiRequest } from "../hooks/useApiRequest";
import type { PatientCase, SeminarNote } from "../types";
import { PatientCaseList } from "./PatientCaseList";
import { SeminarNoteList } from "./SeminarNoteList";
import { PatientCaseModal } from "./PatientCaseModal";
import { SeminarNoteModal } from "./SeminarNoteModal";

export const Home = memo(() => {
  const { user } = useAuth();
  const { execute: fetchCases, isLoading: casesLoading } =
    useApiRequest<PatientCase[]>();
  const { execute: fetchNotes, isLoading: notesLoading } =
    useApiRequest<SeminarNote[]>();

  const [cases, setCases] = useState<PatientCase[]>([]);
  const [notes, setNotes] = useState<SeminarNote[]>([]);
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [selectedNote, setSelectedNote] = useState<SeminarNote | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [casesData, notesData] = await Promise.all([
          fetchCases("/api/patient-cases", { method: "GET" }),
          fetchNotes("/api/seminar-notes", { method: "GET" }),
        ]);
        setCases(casesData);
        setNotes(notesData);
      } catch (err) {
        console.error("データの取得に失敗しました", err);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, fetchCases, fetchNotes]);

  const isLoading = casesLoading || notesLoading;

  const handleDeleteCase = (id: number) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>HOME</h1>
          {user && <p style={{ margin: "8px 0 0" }}>ようこそ、{user.name}さん</p>}
        </div>
        <Link
          to="/create"
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          + 新規作成
        </Link>
      </div>

      {/* 症例・セミナー一覧表示 */}
      {isLoading ? (
        <p>読み込み中...</p>
      ) : (
        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
          <PatientCaseList cases={cases} onSelect={setSelectedCase} />
          <SeminarNoteList notes={notes} onSelect={setSelectedNote} />
        </div>
      )}

      {/* 症例詳細モーダル */}
      {selectedCase && (
        <PatientCaseModal
          patientCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onDelete={handleDeleteCase}
        />
      )}

      {/* セミナーノート詳細モーダル */}
      {selectedNote && (
        <SeminarNoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
});

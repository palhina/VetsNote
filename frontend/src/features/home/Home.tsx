import { memo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../auth";
import { useHomeData } from "../../hooks/useHomeData";
import { useSearch } from "../../hooks/useSearch";
import type { PatientCase, SeminarNote } from "../../types";
import { SearchBar } from "./SearchBar";
import { Loading } from "../../components/ui";
import { PatientCaseList } from "../patientCase/PatientCaseList";
import { SeminarNoteList } from "../seminarNote/SeminarNoteList";
import { PatientCaseModal } from "../patientCase/PatientCaseModal";
import { SeminarNoteModal } from "../seminarNote/SeminarNoteModal";

export const Home = memo(() => {
  const { user } = useAuth();
  const {
    cases,
    notes,
    isLoading: dataLoading,
    handleDeleteCase,
    handleDeleteNote,
  } = useHomeData();

  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchedCases,
    searchedNotes,
    isLoading: searchLoading,
    handleSearch,
    handleClearSearch,
    handleKeyDown,
  } = useSearch();

  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [selectedNote, setSelectedNote] = useState<SeminarNote | null>(null);

  const isLoading = dataLoading || searchLoading;

  // 表示するデータ（検索中は検索結果、そうでなければ全件）
  const displayCases = isSearching ? searchedCases : cases;
  const displayNotes = isSearching ? searchedNotes : notes;

  return (
    <div style={{ padding: "20px" }}>
      {/* ヘッダー */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>HOME</h1>
          {user && (
            <p style={{ margin: "8px 0 0" }}>
              ようこそ、{user.name}さん |{" "}
              <Link to="/mypage" style={{ color: "#007bff" }}>
                マイページ
              </Link>
            </p>
          )}
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

      {/* 検索バー */}
      <SearchBar
        query={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onKeyDown={handleKeyDown}
        isSearching={isSearching}
        resultCount={{
          cases: searchedCases.length,
          notes: searchedNotes.length,
        }}
      />

      {/* 症例・セミナー一覧表示 */}
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
          <PatientCaseList cases={displayCases} onSelect={setSelectedCase} />
          <SeminarNoteList notes={displayNotes} onSelect={setSelectedNote} />
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
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
});

import { memo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../auth";
import { useHomeData } from "../../hooks/useHomeData";
import { useSearch } from "../../hooks/useSearch";
import type { PatientCase, SeminarNote } from "../../types";
import { SearchBar } from "./SearchBar";
import { Loading, LinkButton } from "../../components/ui";
import { PageLayout } from "../../components/layout";
import { PatientCaseList } from "../patientCase/PatientCaseList";
import { SeminarNoteList } from "../seminarNote/SeminarNoteList";
import { PatientCaseModal } from "../patientCase/PatientCaseModal";
import { SeminarNoteModal } from "../seminarNote/SeminarNoteModal";

const WelcomeText = styled.p`
  margin: ${({ theme }) => theme.spacing[2]} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  margin-top: ${({ theme }) => theme.spacing[5]};
`;

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
    <PageLayout
      title="HOME"
      actions={
        <LinkButton to="/create" variant="primary">
          + 新規作成
        </LinkButton>
      }
    >
      {user && (
        <WelcomeText>
          ようこそ、{user.name}さん | <Link to="/mypage">マイページ</Link>
        </WelcomeText>
      )}

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

      {isLoading ? (
        <Loading />
      ) : (
        <ListContainer>
          <PatientCaseList cases={displayCases} onSelect={setSelectedCase} />
          <SeminarNoteList notes={displayNotes} onSelect={setSelectedNote} />
        </ListContainer>
      )}

      {selectedCase && (
        <PatientCaseModal
          patientCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onDelete={handleDeleteCase}
        />
      )}

      {selectedNote && (
        <SeminarNoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
        />
      )}
    </PageLayout>
  );
});

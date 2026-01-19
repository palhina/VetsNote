import { memo, useState, useMemo } from "react";
import styled, { css } from "styled-components";
import type { SeminarNote } from "../../types";

type SortKey = "held_on" | "created_at" | "seminar_name";
type SortOrder = "asc" | "desc";

interface Props {
  notes: SeminarNote[];
  onSelect: (note: SeminarNote) => void;
}

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const SortContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SortButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.neutral[200]};
          color: ${theme.colors.neutral[800]};
        `
      : css`
          background-color: ${theme.colors.background.primary};
          color: ${theme.colors.neutral[600]};
        `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const ItemTitle = styled.strong`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const ItemMeta = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const ItemTheme = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const SeminarNoteList = memo(({ notes, onSelect }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("held_on");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "held_on":
          comparison =
            new Date(a.held_on).getTime() - new Date(b.held_on).getTime();
          break;
        case "created_at":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "seminar_name":
          comparison = a.seminar_name.localeCompare(b.seminar_name, "ja");
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [notes, sortKey, sortOrder]);

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const getSortLabel = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <Container>
      <Title>セミナーノート一覧</Title>

      {notes.length > 0 && (
        <SortContainer>
          <SortButton
            $isActive={sortKey === "held_on"}
            onClick={() => handleSortChange("held_on")}
          >
            開催日{getSortLabel("held_on")}
          </SortButton>
          <SortButton
            $isActive={sortKey === "created_at"}
            onClick={() => handleSortChange("created_at")}
          >
            作成日{getSortLabel("created_at")}
          </SortButton>
          <SortButton
            $isActive={sortKey === "seminar_name"}
            onClick={() => handleSortChange("seminar_name")}
          >
            セミナー名{getSortLabel("seminar_name")}
          </SortButton>
        </SortContainer>
      )}

      {notes.length === 0 ? (
        <EmptyMessage>セミナーノートがありません</EmptyMessage>
      ) : (
        <List>
          {sortedNotes.map((n) => (
            <ListItem key={n.id} onClick={() => onSelect(n)}>
              <ItemTitle>{n.seminar_name}</ItemTitle>
              <ItemMeta>
                {n.held_on}
                {n.lecturer && ` | 講師: ${n.lecturer}`}
              </ItemMeta>
              {n.theme && <ItemTheme>テーマ: {n.theme}</ItemTheme>}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
});

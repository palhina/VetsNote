import { memo, useState, useMemo } from "react";
import styled from "styled-components";
import type { PatientCase } from "../../types";

type SortOrder = "asc" | "desc";

interface Props {
  cases: PatientCase[];
  onSelect: (patientCase: PatientCase) => void;
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

const SortButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

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

const ItemMeta = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const ItemDescription = styled.p`
  margin: ${({ theme }) => theme.spacing[2]} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const ItemDiagnosis = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SortContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const PatientCaseList = memo(({ cases, onSelect }: Props) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const comparison =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [cases, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Container>
      <Title>症例一覧</Title>

      {cases.length > 0 && (
        <SortContainer>
          <SortButton onClick={toggleSortOrder}>
            作成日 {sortOrder === "asc" ? "▲" : "▼"}
          </SortButton>
        </SortContainer>
      )}

      {cases.length === 0 ? (
        <EmptyMessage>症例がありません</EmptyMessage>
      ) : (
        <List>
          {sortedCases.map((c) => (
            <ListItem key={c.id} onClick={() => onSelect(c)}>
              <ItemTitle>
                {c.animal_type} {c.breed && `(${c.breed})`}
              </ItemTitle>
              {c.age && <ItemMeta> - {c.age}歳</ItemMeta>}
              {c.sex && <ItemMeta> - {c.sex}</ItemMeta>}
              <ItemDescription>主訴: {c.chief_complaint || "-"}</ItemDescription>
              {c.diagnosis && <ItemDiagnosis>診断: {c.diagnosis}</ItemDiagnosis>}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
});

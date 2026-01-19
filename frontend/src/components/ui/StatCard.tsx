import { memo } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
}

/**
 * 統計カード
 *
 * デザイン意図:
 * - ダッシュボードでKPIや統計値を表示
 * - 中央揃えで数値を強調
 * - 控えめな背景色で他のコンテンツと調和
 */
const CardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  text-align: center;
  min-width: 150px;
`;

const CardLabel = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const CardValue = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export const StatCard = memo(({ label, value }: StatCardProps) => {
  return (
    <CardContainer>
      <CardLabel>{label}</CardLabel>
      <CardValue>{value}</CardValue>
    </CardContainer>
  );
});

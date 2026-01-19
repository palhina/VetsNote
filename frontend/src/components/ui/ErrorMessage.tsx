import { memo } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message: string;
}

/**
 * エラーメッセージ
 *
 * デザイン意図:
 * - 穏やかな赤で医療系らしく控えめに警告
 * - 小さめのフォントサイズで邪魔にならないように
 * - 入力要素との間に適度な余白を設ける
 * - アイコンを追加して視覚的にエラーと認識しやすく
 */
const StyledError = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.semantic.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin-top: ${({ theme }) => theme.spacing[1]};
  white-space: pre-line;
`;

const ErrorIcon = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ErrorMessage = memo(({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <StyledError role="alert">
      <ErrorIcon aria-hidden="true">!</ErrorIcon>
      {message}
    </StyledError>
  );
});

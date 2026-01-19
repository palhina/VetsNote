import { memo } from "react";
import styled from "styled-components";
import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: ReactNode;
}

/**
 * フォームラベル
 *
 * デザイン意図:
 * - 適度なフォントウェイトで見出しとして認識しやすく
 * - 入力要素との間に適度な余白を設けて関連性を示す
 * - 必須マークは控えめな色で邪魔にならないように
 */
const StyledLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

/**
 * 必須マーク
 *
 * デザイン意図:
 * - 穏やかな赤で医療系らしく控えめに警告
 * - ラベルテキストとの間に適度な余白
 */
const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.semantic.error.main};
  margin-left: ${({ theme }) => theme.spacing[1]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const Label = memo(({ required, children, ...props }: LabelProps) => {
  return (
    <StyledLabel {...props}>
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  );
});

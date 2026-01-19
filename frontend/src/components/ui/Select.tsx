import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * セレクトボックス
 *
 * デザイン意図:
 * - Input/TextArea と同じ視覚言語で一貫性を維持
 * - カスタム矢印アイコンでブラウザ間の見た目を統一
 * - 右側にパディングを追加してアイコンとテキストが重ならないように
 */
const StyledSelect = styled.select<{ $error?: boolean; $fullWidth?: boolean }>`
  /* 基本レイアウト */
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  padding-right: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.neutral[800]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};

  /* カスタム矢印 */
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.spacing[3]} center;

  /* ボーダー */
  border: ${({ theme }) => theme.borders.width.thin} solid
    ${({ theme, $error }) =>
      $error ? theme.colors.semantic.error.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borders.radius.base};

  /* インタラクション */
  cursor: pointer;
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  /* 幅 */
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  /* フォーカス状態 */
  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.semantic.error.main : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px
      ${({ theme, $error }) =>
        $error
          ? `${theme.colors.semantic.error.light}`
          : `${theme.colors.primary[100]}`};
  }

  /* 無効状態 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[500]};
    cursor: not-allowed;
  }
`;

export const Select = memo(
  forwardRef<HTMLSelectElement, SelectProps>(
    ({ error, fullWidth, children, ...props }, ref) => {
      return (
        <StyledSelect
          ref={ref}
          $error={error}
          $fullWidth={fullWidth}
          {...props}
        >
          {children}
        </StyledSelect>
      );
    }
  )
);

import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * テキスト入力フィールド
 *
 * デザイン意図:
 * - 十分なパディングでタップしやすく
 * - 穏やかなボーダーカラーで目に優しい
 * - フォーカス時はプライマリカラーで視覚的フィードバック
 * - エラー時は穏やかな赤で医療系らしく警告
 */
const StyledInput = styled.input<{ $error?: boolean; $fullWidth?: boolean }>`
  /* 基本レイアウト */
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.neutral[800]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};

  /* ボーダー - 穏やかなグレーで主張しすぎない */
  border: ${({ theme }) => theme.borders.width.thin} solid
    ${({ theme, $error }) =>
      $error ? theme.colors.semantic.error.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borders.radius.base};

  /* トランジション */
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  /* 幅 */
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  /* フォーカス状態 - プライマリカラーで明確なフィードバック */
  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.semantic.error.main : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px
      ${({ theme, $error }) =>
        $error
          ? `${theme.colors.semantic.error.light}`
          : `${theme.colors.primary[100]}`};
  }

  /* プレースホルダー - 控えめなグレー */
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  /* 無効状態 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[500]};
    cursor: not-allowed;
  }
`;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ error, fullWidth, ...props }, ref) => {
      return (
        <StyledInput
          ref={ref}
          $error={error}
          $fullWidth={fullWidth}
          {...props}
        />
      );
    }
  )
);

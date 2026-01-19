import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * テキストエリア
 *
 * デザイン意図:
 * - Input と同じ視覚言語を維持して一貫性を確保
 * - 最小高さを設定して初期表示時の使いやすさを確保
 * - 縦方向のみリサイズ可能にしてレイアウト崩れを防止
 */
const StyledTextArea = styled.textarea<{
  $error?: boolean;
  $fullWidth?: boolean;
}>`
  /* 基本レイアウト */
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.neutral[800]};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  font-family: inherit;

  /* サイズ */
  min-height: 100px;
  resize: vertical;

  /* ボーダー */
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

  /* プレースホルダー */
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  /* 無効状態 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[500]};
    cursor: not-allowed;
    resize: none;
  }
`;

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ error, fullWidth, ...props }, ref) => {
      return (
        <StyledTextArea
          ref={ref}
          $error={error}
          $fullWidth={fullWidth}
          {...props}
        />
      );
    }
  )
);

import { memo } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

/**
 * フォームフィールドラッパー
 *
 * デザイン意図:
 * - 各フィールド間に一貫した余白を確保
 * - 16px（spacing.4）の下余白でフォームの読みやすさを向上
 */
const FieldWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

/**
 * フォームフィールド
 *
 * Label + 入力要素 + ErrorMessage をまとめたコンポーネント
 * フォーム内で一貫したレイアウトを実現
 */
export const FormField = memo(
  ({ label, required, error, children, htmlFor }: FormFieldProps) => {
    return (
      <FieldWrapper>
        {label && (
          <Label htmlFor={htmlFor} required={required}>
            {label}
          </Label>
        )}
        {children}
        {error && <ErrorMessage message={error} />}
      </FieldWrapper>
    );
  }
);

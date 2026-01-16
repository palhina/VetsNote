import { memo } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

const FieldWrapper = styled.div`
  margin-bottom: 16px;
`;

// Formのwrapper（Label＋エラーメッセージ＋入力要素）
export const FormField = memo(
  ({ label, required, error, children, htmlFor }: FormFieldProps) => {
    return (
      <FieldWrapper>
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
        {children}
        {error && <ErrorMessage message={error} />}
      </FieldWrapper>
    );
  }
);

import { memo } from "react";
import styled from "styled-components";
import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: ReactNode;
}

const StyledLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
`;

const RequiredMark = styled.span`
  color: #f44336;
  margin-left: 4px;
`;

//フォーム入力項目のラベル
export const Label = memo(({ required, children, ...props }: LabelProps) => {
  return (
    <StyledLabel {...props}>
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  );
});

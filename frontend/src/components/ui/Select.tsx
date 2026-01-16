import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const StyledSelect = styled.select<{ $error?: boolean; $fullWidth?: boolean }>`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid ${({ $error }) => ($error ? "#f44336" : "#ccc")};
  border-radius: 6px;
  outline: none;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#2196f3")};
  }
`;

//ドロップダウンリストのコンポーネント
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

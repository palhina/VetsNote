import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const StyledInput = styled.input<{ $error?: boolean; $fullWidth?: boolean }>`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid ${({ $error }) => ($error ? "#f44336" : "#ccc")};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#2196f3")};
  }

  &::placeholder {
    color: #999;
  }
`;

//テキスト入力フィールド
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

import { memo, forwardRef } from "react";
import styled from "styled-components";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const StyledTextArea = styled.textarea<{
  $error?: boolean;
  $fullWidth?: boolean;
}>`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid ${({ $error }) => ($error ? "#f44336" : "#ccc")};
  border-radius: 6px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#2196f3")};
  }

  &::placeholder {
    color: #999;
  }
`;

// テキストエリア
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

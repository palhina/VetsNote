import { memo } from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message: string;
}

const StyledError = styled.p`
  color: #f44336;
  font-size: 14px;
  margin: 8px 0;
  white-space: pre-line;
`;

//エラーメッセージ表示
export const ErrorMessage = memo(({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return <StyledError>{message}</StyledError>;
});

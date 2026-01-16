import { memo } from "react";
import styled, { css } from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

// ボタンのバリアントごとのスタイル定義
const variantStyles = {
  primary: css`
    background-color: #4caf50;
    color: white;
    border: none;
    &:hover:not(:disabled) {
      background-color: #45a049;
    }
  `,
  secondary: css`
    background-color: #2196f3;
    color: white;
    border: none;
    &:hover:not(:disabled) {
      background-color: #1976d2;
    }
  `,
  danger: css`
    background-color: #f44336;
    color: white;
    border: none;
    &:hover:not(:disabled) {
      background-color: #d32f2f;
    }
  `,
  ghost: css`
    background-color: white;
    color: #333;
    border: 1px solid #ccc;
    &:hover:not(:disabled) {
      background-color: #f5f5f5;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 6px 12px;
    font-size: 12px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 14px;
  `,
  lg: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
};


const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $fullWidth: boolean;
}>`
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Button = memo(
  ({
    variant = "primary",
    size = "md",
    isLoading = false,
    loadingText,
    fullWidth = false,
    children,
    disabled,
    ...props
  }: ButtonProps) => {
    return (
      <StyledButton
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (loadingText ?? `${children}中...`) : children}
      </StyledButton>
    );
  }
);

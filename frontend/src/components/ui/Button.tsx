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

/**
 * バリアントスタイル
 *
 * primary: メインアクション（ティール） - 安心感・信頼感を与える医療系カラー
 * secondary: サブアクション（落ち着いたブルー） - 補助的な操作
 * danger: 破壊的アクション（穏やかな赤） - 刺激を抑えた警告色
 * ghost: 最小限のスタイル - 控えめな操作ボタン
 */
const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[700]};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.semantic.info.main};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.semantic.info.dark};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.semantic.error.main};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.semantic.error.dark};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.neutral[700]};
    border: 1px solid ${({ theme }) => theme.colors.neutral[300]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
      border-color: ${({ theme }) => theme.colors.neutral[400]};
    }
  `,
};

/**
 * サイズスタイル
 *
 * 8pxグリッドに基づいたパディング
 * タッチターゲットサイズ（最低44px）を考慮
 */
const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  `,
};

const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $fullWidth: boolean;
}>`
  /* 基本スタイル */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  /* バリアント適用 */
  ${({ $variant }) => variantStyles[$variant]}

  /* サイズ適用 */
  ${({ $size }) => sizeStyles[$size]}

  /* フル幅 */
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  /* 無効状態 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* フォーカス状態（アクセシビリティ） */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
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

import { memo } from "react";
import styled, { css } from "styled-components";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

/**
 * バッジ/タグコンポーネント
 *
 * デザイン意図:
 * - ステータスやロールを視覚的に区別
 * - 穏やかな色調で医療系アプリとして品位を保つ
 * - 小さくても読みやすいフォントサイズ
 */

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[700]};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[700]};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.semantic.success.light};
    color: ${({ theme }) => theme.colors.semantic.success.dark};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.semantic.warning.light};
    color: ${({ theme }) => theme.colors.semantic.warning.dark};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.semantic.error.light};
    color: ${({ theme }) => theme.colors.semantic.error.dark};
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.semantic.info.light};
    color: ${({ theme }) => theme.colors.semantic.info.dark};
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
};

const StyledBadge = styled.span<{
  $variant: BadgeVariant;
  $size: BadgeSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.radius.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;

export const Badge = memo(
  ({ children, variant = "default", size = "sm" }: BadgeProps) => {
    return (
      <StyledBadge $variant={variant} $size={size}>
        {children}
      </StyledBadge>
    );
  }
);

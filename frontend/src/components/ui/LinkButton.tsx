import { memo } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import type { ReactNode } from "react";

type LinkButtonVariant = "primary" | "secondary" | "ghost";
type LinkButtonSize = "sm" | "md" | "lg";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
}

/**
 * LinkButton
 *
 * デザイン意図:
 * - React RouterのLinkをボタンスタイルで表示
 * - Buttonコンポーネントと同じ見た目で一貫性を保つ
 * - ナビゲーション用の「戻る」ボタン等に使用
 */

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.neutral[0]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary[600]};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.neutral[500]};
    color: ${({ theme }) => theme.colors.neutral[0]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[600]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.neutral[700]};
    border: 1px solid ${({ theme }) => theme.colors.neutral[300]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
      border-color: ${({ theme }) => theme.colors.neutral[400]};
    }
  `,
};

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

const StyledLink = styled(Link)<{
  $variant: LinkButtonVariant;
  $size: LinkButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const LinkButton = memo(
  ({ to, children, variant = "primary", size = "md" }: LinkButtonProps) => {
    return (
      <StyledLink to={to} $variant={variant} $size={size}>
        {children}
      </StyledLink>
    );
  }
);

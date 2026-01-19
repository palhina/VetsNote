import { memo } from "react";
import styled, { css } from "styled-components";
import type { ReactNode } from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
}

/**
 * アラートコンポーネント
 *
 * デザイン意図:
 * - 医療系アプリとして穏やかな色調
 * - 状態を明確に伝えつつ刺激を抑える
 * - 適度なパディングで読みやすく
 */
const variantStyles = {
  success: css`
    background-color: ${({ theme }) => theme.colors.semantic.success.light};
    color: ${({ theme }) => theme.colors.semantic.success.dark};
    border-left: 4px solid ${({ theme }) => theme.colors.semantic.success.main};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.semantic.error.light};
    color: ${({ theme }) => theme.colors.semantic.error.dark};
    border-left: 4px solid ${({ theme }) => theme.colors.semantic.error.main};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.semantic.warning.light};
    color: ${({ theme }) => theme.colors.semantic.warning.dark};
    border-left: 4px solid ${({ theme }) => theme.colors.semantic.warning.main};
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.semantic.info.light};
    color: ${({ theme }) => theme.colors.semantic.info.dark};
    border-left: 4px solid ${({ theme }) => theme.colors.semantic.info.main};
  `,
};

const AlertContainer = styled.div<{ $variant: AlertVariant }>`
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: pre-line;

  ${({ $variant }) => variantStyles[$variant]}
`;

export const Alert = memo(({ children, variant = "info" }: AlertProps) => {
  return <AlertContainer $variant={variant}>{children}</AlertContainer>;
});

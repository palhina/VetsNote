import { memo } from "react";
import styled, { css } from "styled-components";
import type { ReactNode } from "react";
import type { Theme } from "../../styles/theme";

type CardVariant = "default" | "outlined" | "elevated";
type SpacingKey = keyof Theme["spacing"];

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  /** パディングサイズ */
  padding?: "none" | "sm" | "md" | "lg";
  /** クリック可能な場合 */
  clickable?: boolean;
  onClick?: () => void;
}

const paddingMap: Record<"none" | "sm" | "md" | "lg", SpacingKey> = {
  none: 0,
  sm: 3,
  md: 4,
  lg: 6,
};

/**
 * バリアントスタイル
 *
 * default: 白背景 + 軽いシャドウ（最も一般的）
 * outlined: ボーダーのみ（軽量な区切り）
 * elevated: 強めのシャドウ（目立たせたい場合）
 */
const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.background.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  `,
  outlined: css`
    background-color: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  `,
  elevated: css`
    background-color: ${({ theme }) => theme.colors.background.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
    border: none;
  `,
};

/**
 * カードコンテナ
 *
 * デザイン意図:
 * - 白背景でコンテンツを明確に区切る
 * - 適度な角丸でモダンな印象
 * - クリック可能な場合はホバーエフェクト
 */
const CardContainer = styled.div<{
  $variant: CardVariant;
  $padding: "none" | "sm" | "md" | "lg";
  $clickable: boolean;
}>`
  border-radius: ${({ theme }) => theme.borders.radius.md};
  padding: ${({ theme, $padding }) => theme.spacing[paddingMap[$padding]]};
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variantStyles[$variant]}

  ${({ $clickable, theme }) =>
    $clickable &&
    css`
      cursor: pointer;

      &:hover {
        box-shadow: ${theme.shadows.md};
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

export const Card = memo(
  ({
    children,
    variant = "default",
    padding = "md",
    clickable = false,
    onClick,
  }: CardProps) => {
    return (
      <CardContainer
        $variant={variant}
        $padding={padding}
        $clickable={clickable}
        onClick={onClick}
      >
        {children}
      </CardContainer>
    );
  }
);

/**
 * カードヘッダー
 *
 * デザイン意図:
 * - タイトルとアクションの配置パターン
 * - 下ボーダーでコンテンツと区切り
 */
const CardHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const CardHeaderTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const CardHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

interface CardHeaderProps {
  title: string;
  actions?: ReactNode;
}

export const CardHeader = memo(({ title, actions }: CardHeaderProps) => {
  return (
    <CardHeaderContainer>
      <CardHeaderTitle>{title}</CardHeaderTitle>
      {actions && <CardHeaderActions>{actions}</CardHeaderActions>}
    </CardHeaderContainer>
  );
});

/**
 * カードフッター
 *
 * デザイン意図:
 * - アクションボタン等を右寄せで配置
 * - 上ボーダーでコンテンツと区切り
 */
const CardFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

interface CardFooterProps {
  children: ReactNode;
}

export const CardFooter = memo(({ children }: CardFooterProps) => {
  return <CardFooterContainer>{children}</CardFooterContainer>;
});

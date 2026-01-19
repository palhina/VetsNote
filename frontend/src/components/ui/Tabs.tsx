import { memo } from "react";
import styled, { css } from "styled-components";
import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * タブコンポーネント群
 *
 * デザイン意図:
 * - アクティブ状態が明確にわかる
 * - クリック領域が十分に大きい
 * - 素早く切り替えられる操作感
 */

/**
 * タブリストコンテナ
 *
 * タブボタンを横並びで配置
 * 下ボーダーでコンテンツと区切り
 */
export const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding-bottom: ${({ theme }) => theme.spacing[1]};
`;

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $isActive?: boolean;
}

/**
 * タブボタンスタイル
 *
 * デザイン意図:
 * - アクティブ時はプライマリカラーで強調
 * - 非アクティブ時は控えめなグレー
 * - ホバーで操作可能なことを示す
 */
const StyledTabButton = styled.button<TabButtonProps>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: none;
  border-radius: ${({ theme }) =>
    `${theme.borders.radius.base} ${theme.borders.radius.base} 0 0`};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.primary[500]};
          color: ${theme.colors.neutral[0]};
        `
      : css`
          background-color: ${theme.colors.neutral[100]};
          color: ${theme.colors.neutral[600]};

          &:hover {
            background-color: ${theme.colors.neutral[200]};
            color: ${theme.colors.neutral[800]};
          }
        `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: ReactNode;
}

/**
 * タブボタン
 *
 * isActiveでアクティブ状態を制御
 */
export const Tab = memo(
  ({ isActive = false, children, ...props }: TabProps) => {
    return (
      <StyledTabButton $isActive={isActive} {...props}>
        {children}
      </StyledTabButton>
    );
  }
);

/**
 * タブパネル（タブコンテンツ用）
 */
export const TabPanel = styled.div`
  /* コンテンツエリア - 必要に応じてパディング追加 */
`;

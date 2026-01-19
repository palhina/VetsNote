import { memo } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  /** ページタイトル（h1として表示） */
  title?: string;
  /** タイトル横のアクション要素 */
  actions?: ReactNode;
  /** 最大幅を狭くする（フォームページ等） */
  narrow?: boolean;
}

/**
 * ページコンテナ
 *
 * デザイン意図:
 * - ナビゲーション下に適切な余白
 * - 最小高さで短いコンテンツでもフッターが下に
 */
const PageContainer = styled.main`
  min-height: calc(100vh - 60px);
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

/**
 * コンテンツラッパー
 *
 * デザイン意図:
 * - 中央揃えで読みやすいコンテンツ幅
 * - narrowオプションでフォーム等の狭いレイアウトに対応
 */
const ContentWrapper = styled.div<{ $narrow: boolean }>`
  max-width: ${({ $narrow }) => ($narrow ? "640px" : "1200px")};
  margin: 0 auto;
`;

/**
 * ページヘッダー
 *
 * デザイン意図:
 * - タイトルとアクションを両端に配置
 * - 下余白でコンテンツとの区切りを明確に
 */
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

/**
 * ページレイアウト
 *
 * 各ページの基本構造を提供
 * タイトル + アクション + コンテンツの統一レイアウト
 */
export const PageLayout = memo(
  ({ children, title, actions, narrow = false }: PageLayoutProps) => {
    return (
      <PageContainer>
        <ContentWrapper $narrow={narrow}>
          {(title || actions) && (
            <PageHeader>
              {title && <PageTitle>{title}</PageTitle>}
              {actions && <Actions>{actions}</Actions>}
            </PageHeader>
          )}
          {children}
        </ContentWrapper>
      </PageContainer>
    );
  }
);

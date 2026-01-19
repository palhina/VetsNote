import styled from "styled-components";

/**
 * テーブルコンポーネント群
 *
 * デザイン意図:
 * - 医療系アプリとして見やすく整理されたデータ表示
 * - 長時間閲覧しても疲れない控えめなスタイル
 * - 一貫したパディングとボーダーで視認性確保
 */

/**
 * テーブル本体
 *
 * border-collapse: collapse で隣接セルのボーダーを結合
 * 白背景でコンテンツを明確に表示
 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

/**
 * テーブルヘッダー行
 *
 * 薄いグレー背景でヘッダーを区別
 */
export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral[100]};
`;

/**
 * テーブルボディ
 */
export const Tbody = styled.tbody``;

/**
 * テーブル行
 *
 * ホバー時に薄い背景色で現在行を強調
 */
export const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;

/**
 * テーブルヘッダーセル
 *
 * デザイン意図:
 * - 左揃えで読みやすく
 * - semiboldで見出しとして認識しやすく
 * - 適度なパディングでタッチ/クリックしやすく
 */
export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing[3]};
  text-align: left;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[700]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  white-space: nowrap;
`;

/**
 * テーブルデータセル
 *
 * デザイン意図:
 * - Thと同じパディングで整列
 * - 本文色で読みやすく
 */
export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  vertical-align: middle;
`;

/**
 * テーブルラッパー
 *
 * 横スクロール対応でモバイルでも表示可能
 */
export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borders.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  /* ラッパー内のテーブルはボーダー不要 */
  ${Table} {
    border: none;
  }

  ${Th}, ${Td} {
    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }

  ${Thead} ${Tr}:first-child ${Th} {
    border-top: none;
  }

  ${Tbody} ${Tr}:last-child ${Td} {
    border-bottom: none;
  }
`;

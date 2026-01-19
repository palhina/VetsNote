import { createGlobalStyle } from "styled-components";

/**
 * VetPocket Global Styles
 *
 * 設計思想:
 * - ブラウザ間の差異をリセットしつつ、使いやすいデフォルトを設定
 * - Inter + Noto Sans JP の読み込み
 * - 長時間使用でも疲れにくい基本設定
 */
export const GlobalStyle = createGlobalStyle`
  /* CSS リセット - モダンブラウザ向け最小限のリセット */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ルート要素の設定 */
  html {
    /* 16px = 1rem のベース */
    font-size: 16px;
    /* スムーズスクロール */
    scroll-behavior: smooth;
    /* テキストのアンチエイリアス */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ボディ基本設定 */
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.neutral[700]};
    background-color: ${({ theme }) => theme.colors.background.secondary};

    /* 最小高さを画面全体に */
    min-height: 100vh;
    min-height: 100dvh; /* iOS Safari対応 */
  }

  /* React root要素 */
  #root {
    min-height: 100vh;
    min-height: 100dvh;
  }

  /* 見出しのデフォルト */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.neutral[800]};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  /* 段落 */
  p {
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  /* リンク */
  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary[600]};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borders.radius.sm};
    }
  }

  /* ボタンのリセット */
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* 入力要素のリセット */
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  /* 画像 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* リストのリセット */
  ul, ol {
    list-style: none;
  }

  /* テーブルのリセット */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* フォーカス可視化（アクセシビリティ） */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* スクロールバーのカスタマイズ（Webkit系ブラウザ） */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.neutral[400]};
    }
  }

  /* 選択テキストのスタイル */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[800]};
  }

  /* 無効化された要素のカーソル */
  [disabled] {
    cursor: not-allowed;
  }
`;

/**
 * VetPocket Design System - Theme Definition
 *
 * 設計思想:
 * - 獣医師が長時間使用しても疲れない穏やかな配色
 * - 医療系アプリとしての信頼感と清潔感
 * - 素早く・迷わず操作できる明確なコントラスト
 */

export const theme = {
  /**
   * カラーパレット
   *
   * primary: ティール/ターコイズ系
   *   - 安心感・清潔感を与える医療系に適した色
   *   - 緑と青の中間で、落ち着きと信頼性を表現
   *
   * neutral: グレースケール
   *   - 明るめのニュートラルで目に優しい
   *   - 長時間の使用でも疲れにくい
   *
   * semantic: 状態を表す色
   *   - 医療UIらしく穏やかなトーンで統一
   *   - 刺激的すぎない、落ち着いた警告色
   */
  colors: {
    // プライマリカラー（ティール/ターコイズ系）
    primary: {
      50: "#E6F5F3", // 最も薄い - 背景のホバー等
      100: "#CCEBe7", // 薄い背景
      200: "#99D7CF", // 軽いアクセント
      300: "#66C3B7", // サブ要素
      400: "#33AF9F", // ホバー状態
      500: "#2A9D8F", // メインカラー - ボタン、リンク等
      600: "#228077", // ホバー時のメイン
      700: "#1A635F", // アクティブ状態
      800: "#124647", // 強調テキスト
      900: "#0A292F", // 最も濃い
    },

    // ニュートラル（グレースケール）
    neutral: {
      0: "#FFFFFF", // 純白 - カード背景等
      50: "#FAFBFC", // ほぼ白 - ページ背景
      100: "#F5F6F7", // 薄いグレー - セクション背景
      200: "#E8EAED", // ボーダー（薄）
      300: "#D1D5DB", // ボーダー（通常）
      400: "#9CA3AF", // プレースホルダー
      500: "#6B7280", // セカンダリテキスト
      600: "#4B5563", // ボディテキスト
      700: "#374151", // 見出しテキスト
      800: "#1F2937", // 強調テキスト
      900: "#111827", // 最も濃いテキスト
    },

    // セマンティックカラー（状態表現）
    semantic: {
      // 成功 - 穏やかなグリーン
      success: {
        light: "#D1FAE5",
        main: "#059669",
        dark: "#047857",
      },
      // 警告 - 穏やかなアンバー
      warning: {
        light: "#FEF3C7",
        main: "#D97706",
        dark: "#B45309",
      },
      // エラー - 穏やかなコーラル/レッド（医療系として刺激を抑えた赤）
      error: {
        light: "#FEE2E2",
        main: "#DC2626",
        dark: "#B91C1C",
      },
      // 情報 - 穏やかなブルー
      info: {
        light: "#DBEAFE",
        main: "#2563EB",
        dark: "#1D4ED8",
      },
    },

    // 背景色
    background: {
      primary: "#FFFFFF", // メインコンテンツ
      secondary: "#FAFBFC", // ページ全体
      tertiary: "#F5F6F7", // セクション区切り
    },

    // オーバーレイ
    overlay: {
      light: "rgba(0, 0, 0, 0.3)",
      medium: "rgba(0, 0, 0, 0.5)",
      dark: "rgba(0, 0, 0, 0.7)",
    },
  },

  /**
   * タイポグラフィ
   *
   * フォント選定理由:
   * - Inter: 英数字の可読性が高く、UIに最適
   * - Noto Sans JP: 日本語の可読性が高く、Interと相性が良い
   * - 丸すぎず角ばりすぎない、業務アプリとして適切なサンセリフ
   */
  typography: {
    fontFamily: {
      // システムフォントをフォールバックに設定
      base: '"Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
    },

    // フォントサイズ（rem単位で一貫性を保つ）
    fontSize: {
      xs: "0.75rem", // 12px - 補足情報
      sm: "0.875rem", // 14px - ボディ（小）
      base: "1rem", // 16px - ボディ（標準）
      lg: "1.125rem", // 18px - 大きめテキスト
      xl: "1.25rem", // 20px - 小見出し
      "2xl": "1.5rem", // 24px - 見出し
      "3xl": "1.875rem", // 30px - ページタイトル
      "4xl": "2.25rem", // 36px - 大見出し
    },

    // フォントウェイト
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // 行間（読みやすさを重視）
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  /**
   * スペーシング
   *
   * 8pxグリッドシステムを採用
   * - 一貫性のあるリズム感
   * - 素早く余白を決定できる
   */
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
  },

  /**
   * ボーダー
   */
  borders: {
    radius: {
      none: "0",
      sm: "0.25rem", // 4px - 小さな要素
      base: "0.375rem", // 6px - ボタン、入力
      md: "0.5rem", // 8px - カード
      lg: "0.75rem", // 12px - モーダル
      xl: "1rem", // 16px - 大きなカード
      full: "9999px", // 円形
    },
    width: {
      thin: "1px",
      medium: "2px",
      thick: "3px",
    },
  },

  /**
   * シャドウ
   *
   * 控えめなシャドウで奥行きを表現
   * 派手になりすぎないよう注意
   */
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  /**
   * トランジション
   *
   * 素早いフィードバックで操作感を向上
   */
  transitions: {
    fast: "150ms ease",
    base: "200ms ease",
    slow: "300ms ease",
  },

  /**
   * Z-index
   *
   * レイヤー管理の一貫性を保つ
   */
  zIndex: {
    dropdown: 100,
    sticky: 200,
    modal: 1000,
    modalOverlay: 999,
    toast: 1100,
    tooltip: 1200,
  },
} as const;

// テーマの型定義
export type Theme = typeof theme;

// styled-components用の型拡張
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

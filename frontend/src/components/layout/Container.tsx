import styled from "styled-components";
import type { Theme } from "../../styles/theme";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type SpacingKey = keyof Theme["spacing"];

const sizeMap: Record<ContainerSize, string> = {
  sm: "480px",
  md: "640px",
  lg: "960px",
  xl: "1200px",
  full: "100%",
};

interface ContainerProps {
  /** 最大幅サイズ */
  size?: ContainerSize;
  /** 中央揃え */
  center?: boolean;
}

/**
 * コンテンツコンテナ
 *
 * デザイン意図:
 * - 複数のサイズバリエーションで柔軟なレイアウト
 * - 左右パディングでモバイル時も余白確保
 * - centerオプションで中央揃えを制御
 */
export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ size = "lg" }) => sizeMap[size]};
  margin-left: ${({ center = true }) => (center ? "auto" : "0")};
  margin-right: ${({ center = true }) => (center ? "auto" : "0")};
  padding-left: ${({ theme }) => theme.spacing[4]};
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

/**
 * フレックスコンテナ
 *
 * デザイン意図:
 * - よく使うFlexboxパターンを簡単に適用
 * - 方向、配置、ギャップを柔軟に設定可能
 */
interface FlexProps {
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  $gap?: SpacingKey;
  wrap?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  align-items: ${({ align = "stretch" }) => align};
  justify-content: ${({ justify = "flex-start" }) => justify};
  gap: ${({ theme, $gap = 0 }) => theme.spacing[$gap]};
  flex-wrap: ${({ wrap = false }) => (wrap ? "wrap" : "nowrap")};
`;

/**
 * グリッドコンテナ
 *
 * デザイン意図:
 * - レスポンシブなグリッドレイアウト
 * - 最小幅を指定してauto-fitで自動調整
 */
interface GridProps {
  /** 各カラムの最小幅 */
  minWidth?: string;
  /** カラム間のギャップ */
  $gap?: SpacingKey;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minWidth = "280px" }) => minWidth}, 1fr)
  );
  gap: ${({ theme, $gap = 4 }) => theme.spacing[$gap]};
`;

/**
 * スタック（縦方向の積み重ね）
 *
 * デザイン意図:
 * - 縦方向に要素を並べる最もシンプルなパターン
 * - 一貫したギャップで整理されたレイアウト
 */
interface StackProps {
  $gap?: SpacingKey;
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $gap = 4 }) => theme.spacing[$gap]};
`;

/**
 * インラインスタック（横方向の並び）
 *
 * デザイン意図:
 * - 横方向に要素を並べるシンプルなパターン
 * - 折り返し対応でレスポンシブ
 */
interface InlineProps {
  $gap?: SpacingKey;
  align?: "flex-start" | "center" | "flex-end";
}

export const Inline = styled.div<InlineProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: ${({ align = "center" }) => align};
  gap: ${({ theme, $gap = 2 }) => theme.spacing[$gap]};
`;

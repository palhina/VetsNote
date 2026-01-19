import { memo } from "react";
import styled, { keyframes } from "styled-components";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * スピンアニメーション
 *
 * デザイン意図:
 * - 1秒で1回転の落ち着いたスピード
 * - linear で一定速度を維持し、安定感を演出
 */
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const sizeMap = {
  sm: { spinner: "14px", border: "2px" },
  md: { spinner: "18px", border: "2px" },
  lg: { spinner: "24px", border: "3px" },
};

/**
 * ローディングコンテナ
 *
 * デザイン意図:
 * - 中央揃えで視認性を確保
 * - 適度な余白でコンテンツとの分離
 */
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[4]} 0`};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

/**
 * スピナー
 *
 * デザイン意図:
 * - プライマリカラーのアクセントで視認性を確保
 * - 穏やかなグレーの残りの部分で落ち着いた印象
 * - シンプルな円形でミニマルなデザイン
 */
const Spinner = styled.span<{ $size: "sm" | "md" | "lg" }>`
  display: inline-block;
  width: ${({ $size }) => sizeMap[$size].spinner};
  height: ${({ $size }) => sizeMap[$size].spinner};
  border: ${({ $size }) => sizeMap[$size].border} solid
    ${({ theme }) => theme.colors.neutral[200]};
  border-top-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const Loading = memo(
  ({ message = "読み込み中...", size = "md" }: LoadingProps) => {
    return (
      <LoadingContainer role="status" aria-label={message}>
        <Spinner $size={size} />
        <Message>{message}</Message>
      </LoadingContainer>
    );
  }
);

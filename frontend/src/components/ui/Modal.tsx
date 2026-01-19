import { memo, useEffect } from "react";
import styled from "styled-components";
import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
  zIndex?: number;
}

/**
 * オーバーレイ
 *
 * デザイン意図:
 * - 半透明の黒で背景を暗くし、モーダルへの集中を促す
 * - 控えめな透明度で圧迫感を軽減
 */
const Overlay = styled.div<{ $zIndex: number }>`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ $zIndex }) => $zIndex};
  padding: ${({ theme }) => theme.spacing[4]};
`;

/**
 * モーダルコンテンツ
 *
 * デザイン意図:
 * - 白背景で清潔感と視認性を確保
 * - 適度な角丸でモダンかつ親しみやすい印象
 * - シャドウで浮いている感を演出
 * - 最大高さ制限とスクロールで長いコンテンツに対応
 */
const Content = styled.div<{ $maxWidth: string }>`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

export const Modal = memo(
  ({ children, onClose, maxWidth = "600px", zIndex = 1000 }: ModalProps) => {
    // ESCキーでモーダルを閉じる
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // モーダル表示中は背景スクロールを無効化
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    return (
      <Overlay $zIndex={zIndex} onClick={onClose}>
        <Content
          $maxWidth={maxWidth}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </Content>
      </Overlay>
    );
  }
);

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

/**
 * モーダルヘッダー
 *
 * デザイン意図:
 * - タイトルと閉じるボタンを両端に配置
 * - 区切り線でヘッダーとコンテンツを視覚的に分離
 */
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const Subtitle = styled.p`
  margin: ${({ theme }) => `${theme.spacing[2]} 0 0`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borders.radius.base};
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

const Divider = styled.hr`
  margin: ${({ theme }) => `${theme.spacing[4]} 0`};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

export const ModalHeader = memo(
  ({ title, subtitle, onClose }: ModalHeaderProps) => {
    return (
      <>
        <HeaderContainer>
          <div>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </div>
          <CloseButton onClick={onClose} aria-label="閉じる">
            ×
          </CloseButton>
        </HeaderContainer>
        <Divider />
      </>
    );
  }
);

interface ModalActionsProps {
  children: ReactNode;
}

/**
 * モーダルアクション
 *
 * デザイン意図:
 * - コンテンツとの間に余白を設けて視覚的に分離
 * - ボタンを右寄せで配置（一般的なUIパターン）
 * - ボタン間に適度なギャップ
 */
const ActionsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ModalActions = memo(({ children }: ModalActionsProps) => {
  return <ActionsContainer>{children}</ActionsContainer>;
});

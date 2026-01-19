import { memo } from "react";
import styled from "styled-components";
import { Modal, ModalActions } from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * ダイアログタイトル
 *
 * デザイン意図:
 * - やや大きめのフォントで重要性を示す
 * - 下余白でメッセージとの間に適度な空間
 */
const DialogTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

/**
 * ダイアログメッセージ
 *
 * デザイン意図:
 * - 読みやすい行間
 * - やや薄めの色で本文らしい印象
 */
const DialogMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

/**
 * 確認ダイアログ
 *
 * 削除などの破壊的アクション前に確認を求めるダイアログ
 * 医療系アプリとして、誤操作を防ぐ重要なUI
 */
export const ConfirmDialog = memo(
  ({
    title = "確認",
    message,
    confirmLabel = "削除",
    cancelLabel = "キャンセル",
    isLoading = false,
    onConfirm,
    onCancel,
  }: ConfirmDialogProps) => {
    return (
      <Modal onClose={onCancel} maxWidth="400px" zIndex={1100}>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{message}</DialogMessage>
        <ModalActions>
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={`${confirmLabel}中...`}
          >
            {confirmLabel}
          </Button>
        </ModalActions>
      </Modal>
    );
  }
);

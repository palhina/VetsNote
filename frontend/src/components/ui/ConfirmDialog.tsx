import { memo } from "react";
import { Modal, ModalActions } from "./Modal";
import { Button } from "./Button";

interface Props {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// 削除時確認ダイアログ
export const ConfirmDialog = memo(
  ({
    title = "確認",
    message,
    confirmLabel = "削除",
    cancelLabel = "キャンセル",
    isLoading = false,
    onConfirm,
    onCancel,
  }: Props) => {
    return (
      <Modal onClose={onCancel} maxWidth="400px" zIndex={1100}>
        <h3 style={{ margin: "0 0 16px" }}>{title}</h3>
        <p>{message}</p>
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

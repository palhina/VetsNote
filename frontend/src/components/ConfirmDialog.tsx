import { memo } from "react";
import { Modal, ModalActions } from "./Modal";

interface Props {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

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
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? `${confirmLabel}中...` : confirmLabel}
          </button>
        </ModalActions>
      </Modal>
    );
  }
);

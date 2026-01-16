import { memo } from "react";
import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
  zIndex?: number;
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentBaseStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  width: "90%",
  maxHeight: "80vh",
  overflow: "auto",
};

// メモ詳細表示モーダル
export const Modal = memo(
  ({ children, onClose, maxWidth = "600px", zIndex = 1000 }: Props) => {
    return (
      <div style={{ ...overlayStyle, zIndex }} onClick={onClose}>
        <div
          style={{ ...contentBaseStyle, maxWidth }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
);

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const ModalHeader = memo(
  ({ title, subtitle, onClose }: ModalHeaderProps) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0 8px",
            }}
          >
            ×
          </button>
        </div>
        {subtitle && <p style={{ color: "#888", margin: "8px 0" }}>{subtitle}</p>}
        <hr
          style={{
            margin: "16px 0",
            border: "none",
            borderTop: "1px solid #eee",
          }}
        />
      </>
    );
  }
);

interface ModalActionsProps {
  children: ReactNode;
}

export const ModalActions = memo(({ children }: ModalActionsProps) => {
  return (
    <div
      style={{
        marginTop: "24px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
      }}
    >
      {children}
    </div>
  );
});

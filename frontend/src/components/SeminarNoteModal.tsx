import { memo } from "react";
import type { SeminarNote } from "../types";

interface Props {
  note: SeminarNote;
  onClose: () => void;
}

export const SeminarNoteModal = memo(({ note, onClose }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h2 style={{ margin: 0 }}>{note.seminar_name}</h2>
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
        <p style={{ color: "#888", margin: "8px 0" }}>
          {note.held_on}
          {note.lecturer && ` | 講師: ${note.lecturer}`}
        </p>
        {note.theme && (
          <p style={{ color: "#666", margin: "8px 0" }}>
            <strong>テーマ:</strong> {note.theme}
          </p>
        )}
        <hr
          style={{ margin: "16px 0", border: "none", borderTop: "1px solid #eee" }}
        />
        <div>
          <strong>内容:</strong>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
});

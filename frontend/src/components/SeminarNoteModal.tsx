import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { SeminarNote } from "../types";

interface Props {
  note: SeminarNote;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const SeminarNoteModal = memo(({ note, onClose, onDelete }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { execute: deleteNote, isLoading } = useApiRequest();

  const handleDelete = async () => {
    try {
      await deleteNote(`/api/seminar-notes/${note.id}`, {
        method: "DELETE",
      });
      onDelete(note.id);
      onClose();
    } catch (err) {
      console.error("削除に失敗しました", err);
    }
  };

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

        {/* ボタン */}
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              padding: "10px 24px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            削除
          </button>
          <Link
            to={`/seminar-notes/${note.id}/edit`}
            style={{
              padding: "10px 24px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            編集
          </Link>
        </div>

        {/* 削除確認ダイアログ */}
        {showConfirm && (
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
              zIndex: 1100,
            }}
            onClick={() => setShowConfirm(false)}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                maxWidth: "400px",
                width: "90%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ margin: "0 0 16px" }}>確認</h3>
              <p>このセミナーノートを削除してもよろしいですか？</p>
              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  キャンセル
                </button>
                <button
                  onClick={handleDelete}
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
                  {isLoading ? "削除中..." : "削除"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

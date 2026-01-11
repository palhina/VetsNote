import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { Modal, ModalHeader, ModalActions } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
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

  const subtitle = [note.held_on, note.lecturer && `講師: ${note.lecturer}`]
    .filter(Boolean)
    .join(" | ");

  return (
    <>
      <Modal onClose={onClose} maxWidth="600px">
        <ModalHeader
          title={note.seminar_name}
          subtitle={subtitle}
          onClose={onClose}
        />

        {note.theme && (
          <p style={{ color: "#666", margin: "0 0 16px" }}>
            <strong>テーマ:</strong> {note.theme}
          </p>
        )}

        <div>
          <strong>内容:</strong>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {note.content}
          </p>
        </div>

        <ModalActions>
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
        </ModalActions>
      </Modal>

      {showConfirm && (
        <ConfirmDialog
          message="このセミナーノートを削除してもよろしいですか？"
          isLoading={isLoading}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
});

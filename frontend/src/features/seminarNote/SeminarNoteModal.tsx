import { memo, useState } from "react";
import styled from "styled-components";
import { useApiRequest } from "../../hooks/useApiRequest";
import {
  Modal,
  ModalHeader,
  ModalActions,
  ConfirmDialog,
  Button,
  LinkButton,
} from "../../components/ui";
import type { SeminarNote } from "../../types";

interface Props {
  note: SeminarNote;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const ThemeText = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  strong {
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
`;

const Field = styled.div`
  strong {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
`;

const ContentText = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  white-space: pre-wrap;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

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
          <ThemeText>
            <strong>テーマ:</strong> {note.theme}
          </ThemeText>
        )}

        <Field>
          <strong>内容:</strong>
          <ContentText>{note.content}</ContentText>
        </Field>

        <ModalActions>
          <Button variant="danger" onClick={() => setShowConfirm(true)}>
            削除
          </Button>
          <LinkButton to={`/seminar-notes/${note.id}/edit`} variant="secondary">
            編集
          </LinkButton>
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

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
import type { PatientCase } from "../../types";

interface Props {
  patientCase: PatientCase;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const ContentGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Field = styled.div`
  strong {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
`;

const FieldValue = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  white-space: pre-wrap;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const PatientCaseModal = memo(
  ({ patientCase, onClose, onDelete }: Props) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { execute: deleteCase, isLoading } = useApiRequest();

    const handleDelete = async () => {
      try {
        await deleteCase(`/api/patient-cases/${patientCase.id}`, {
          method: "DELETE",
        });
        onDelete(patientCase.id);
        onClose();
      } catch (err) {
        console.error("削除に失敗しました", err);
      }
    };

    const subtitle = [
      patientCase.age && `${patientCase.age}歳`,
      patientCase.sex,
    ]
      .filter(Boolean)
      .join(" | ");

    return (
      <>
        <Modal onClose={onClose} maxWidth="700px">
          <ModalHeader
            title={`${patientCase.animal_type}${patientCase.breed ? ` (${patientCase.breed})` : ""}`}
            subtitle={subtitle}
            onClose={onClose}
          />

          <ContentGrid>
            <Field>
              <strong>主訴:</strong>
              <FieldValue>{patientCase.chief_complaint || "-"}</FieldValue>
            </Field>
            {patientCase.history && (
              <Field>
                <strong>病歴:</strong>
                <FieldValue>{patientCase.history}</FieldValue>
              </Field>
            )}
            {patientCase.examination && (
              <Field>
                <strong>検査所見:</strong>
                <FieldValue>{patientCase.examination}</FieldValue>
              </Field>
            )}
            {patientCase.diagnosis && (
              <Field>
                <strong>診断:</strong>
                <FieldValue>{patientCase.diagnosis}</FieldValue>
              </Field>
            )}
            {patientCase.treatment && (
              <Field>
                <strong>治療:</strong>
                <FieldValue>{patientCase.treatment}</FieldValue>
              </Field>
            )}
            {patientCase.progress && (
              <Field>
                <strong>経過:</strong>
                <FieldValue>{patientCase.progress}</FieldValue>
              </Field>
            )}
            {patientCase.memo && (
              <Field>
                <strong>メモ:</strong>
                <FieldValue>{patientCase.memo}</FieldValue>
              </Field>
            )}
          </ContentGrid>

          <ModalActions>
            <Button variant="danger" onClick={() => setShowConfirm(true)}>
              削除
            </Button>
            <LinkButton
              to={`/patient-cases/${patientCase.id}/edit`}
              variant="secondary"
            >
              編集
            </LinkButton>
          </ModalActions>
        </Modal>

        {showConfirm && (
          <ConfirmDialog
            message="この症例を削除してもよろしいですか？"
            isLoading={isLoading}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </>
    );
  }
);

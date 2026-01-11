import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { Modal, ModalHeader, ModalActions } from "./Modal";
import { ConfirmDialog } from "./ConfirmDialog";
import type { PatientCase } from "../types";

interface Props {
  patientCase: PatientCase;
  onClose: () => void;
  onDelete: (id: number) => void;
}

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

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <strong>主訴:</strong>
              <p style={{ margin: "4px 0" }}>
                {patientCase.chief_complaint || "-"}
              </p>
            </div>
            {patientCase.history && (
              <div>
                <strong>病歴:</strong>
                <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>
                  {patientCase.history}
                </p>
              </div>
            )}
            {patientCase.examination && (
              <div>
                <strong>検査所見:</strong>
                <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>
                  {patientCase.examination}
                </p>
              </div>
            )}
            {patientCase.diagnosis && (
              <div>
                <strong>診断:</strong>
                <p style={{ margin: "4px 0" }}>{patientCase.diagnosis}</p>
              </div>
            )}
            {patientCase.treatment && (
              <div>
                <strong>治療:</strong>
                <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>
                  {patientCase.treatment}
                </p>
              </div>
            )}
            {patientCase.progress && (
              <div>
                <strong>経過:</strong>
                <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>
                  {patientCase.progress}
                </p>
              </div>
            )}
            {patientCase.memo && (
              <div>
                <strong>メモ:</strong>
                <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>
                  {patientCase.memo}
                </p>
              </div>
            )}
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
              to={`/patient-cases/${patientCase.id}/edit`}
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

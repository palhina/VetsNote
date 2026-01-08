import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { PatientCase } from "../types";

interface Props {
  patientCase: PatientCase;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const PatientCaseModal = memo(({ patientCase, onClose, onDelete }: Props) => {
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
          maxWidth: "700px",
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
          <h2 style={{ margin: 0 }}>
            {patientCase.animal_type}{" "}
            {patientCase.breed && `(${patientCase.breed})`}
          </h2>
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
          {patientCase.age && `${patientCase.age}歳`}
          {patientCase.sex && ` | ${patientCase.sex}`}
        </p>
        <hr
          style={{ margin: "16px 0", border: "none", borderTop: "1px solid #eee" }}
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
              <p>この症例を削除してもよろしいですか？</p>
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

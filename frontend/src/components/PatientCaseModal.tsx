import { memo } from "react";
import type { PatientCase } from "../types";

interface Props {
  patientCase: PatientCase;
  onClose: () => void;
}

export const PatientCaseModal = memo(({ patientCase, onClose }: Props) => {
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
      </div>
    </div>
  );
});

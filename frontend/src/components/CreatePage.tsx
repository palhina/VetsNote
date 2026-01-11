import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import {
  PatientCaseForm,
  initialPatientCaseData,
} from "./PatientCaseForm";
import type { PatientCaseFormData } from "./PatientCaseForm";
import {
  SeminarNoteForm,
  initialSeminarNoteData,
} from "./SeminarNoteForm";
import type { SeminarNoteFormData } from "./SeminarNoteForm";
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from "../styles/formStyles";
import type { PatientCase, SeminarNote } from "../types";

type FormType = "patient_case" | "seminar_note";

export const CreatePage = memo(() => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState<FormType>("patient_case");
  const [patientCaseData, setPatientCaseData] = useState<PatientCaseFormData>(
    initialPatientCaseData
  );
  const [seminarNoteData, setSeminarNoteData] = useState<SeminarNoteFormData>(
    initialSeminarNoteData
  );

  const { execute: createCase, isLoading: caseLoading } =
    useApiRequest<PatientCase>();
  const { execute: createNote, isLoading: noteLoading } =
    useApiRequest<SeminarNote>();

  const isLoading = caseLoading || noteLoading;

  const handlePatientCaseChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPatientCaseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeminarNoteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSeminarNoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formType === "patient_case") {
        const payload = {
          ...patientCaseData,
          age: patientCaseData.age ? parseInt(patientCaseData.age, 10) : null,
        };
        await createCase("/api/patient-cases", {
          method: "POST",
          body: payload,
        });
      } else {
        await createNote("/api/seminar-notes", {
          method: "POST",
          body: seminarNoteData as unknown as Record<string, unknown>,
        });
      }
      navigate("/");
    } catch (err) {
      console.error("作成に失敗しました", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>新規作成</h1>

      {/* フォーム切り替え */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "24px",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          <input
            type="radio"
            name="formType"
            value="patient_case"
            checked={formType === "patient_case"}
            onChange={() => setFormType("patient_case")}
            style={{ marginRight: "8px", width: "18px", height: "18px" }}
          />
          症例
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          <input
            type="radio"
            name="formType"
            value="seminar_note"
            checked={formType === "seminar_note"}
            onChange={() => setFormType("seminar_note")}
            style={{ marginRight: "8px", width: "18px", height: "18px" }}
          />
          セミナーノート
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {formType === "patient_case" ? (
          <PatientCaseForm
            data={patientCaseData}
            onChange={handlePatientCaseChange}
          />
        ) : (
          <SeminarNoteForm
            data={seminarNoteData}
            onChange={handleSeminarNoteChange}
          />
        )}

        {/* ボタン */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={secondaryButtonStyle}
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...primaryButtonStyle,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "作成中..." : "作成"}
          </button>
        </div>
      </form>
    </div>
  );
});

import { memo, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import type { PatientCase, SeminarNote } from "../types";

type FormType = "patient_case" | "seminar_note";

interface Props {
  onClose: () => void;
  onCreated: (type: FormType, data: PatientCase | SeminarNote) => void;
}

interface PatientCaseFormData {
  animal_type: string;
  breed: string;
  age: string;
  sex: string;
  chief_complaint: string;
  history: string;
  examination: string;
  diagnosis: string;
  treatment: string;
  progress: string;
  memo: string;
}

interface SeminarNoteFormData {
  seminar_name: string;
  held_on: string;
  lecturer: string;
  theme: string;
  content: string;
}

const initialPatientCaseData: PatientCaseFormData = {
  animal_type: "",
  breed: "",
  age: "",
  sex: "",
  chief_complaint: "",
  history: "",
  examination: "",
  diagnosis: "",
  treatment: "",
  progress: "",
  memo: "",
};

const initialSeminarNoteData: SeminarNoteFormData = {
  seminar_name: "",
  held_on: "",
  lecturer: "",
  theme: "",
  content: "",
};

export const CreateFormModal = memo(({ onClose, onCreated }: Props) => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        const result = await createCase("/api/patient-cases", {
          method: "POST",
          body: payload,
        });
        onCreated("patient_case", result);
      } else {
        const result = await createNote("/api/seminar-notes", {
          method: "POST",
          body: seminarNoteData,
        });
        onCreated("seminar_note", result);
      }
      onClose();
    } catch (err) {
      console.error("作成に失敗しました", err);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontWeight: "bold" as const,
    fontSize: "14px",
  };

  const fieldStyle = {
    marginBottom: "12px",
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
          maxHeight: "85vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>新規作成</h2>
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

        {/* ラジオボタン */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "20px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="radio"
              name="formType"
              value="patient_case"
              checked={formType === "patient_case"}
              onChange={() => setFormType("patient_case")}
              style={{ marginRight: "8px" }}
            />
            症例
          </label>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="radio"
              name="formType"
              value="seminar_note"
              checked={formType === "seminar_note"}
              onChange={() => setFormType("seminar_note")}
              style={{ marginRight: "8px" }}
            />
            セミナーノート
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 症例フォーム */}
          <div style={{ display: formType === "patient_case" ? "block" : "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>
                  動物種 <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="animal_type"
                  value={patientCaseData.animal_type}
                  onChange={handlePatientCaseChange}
                  style={inputStyle}
                  required={formType === "patient_case"}
                >
                  <option value="">選択してください</option>
                  <option value="犬">犬</option>
                  <option value="猫">猫</option>
                  <option value="ウサギ">ウサギ</option>
                  <option value="ハムスター">ハムスター</option>
                  <option value="鳥">鳥</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>品種</label>
                <input
                  type="text"
                  name="breed"
                  value={patientCaseData.breed}
                  onChange={handlePatientCaseChange}
                  style={inputStyle}
                  placeholder="例: トイプードル"
                />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>年齢</label>
                <input
                  type="number"
                  name="age"
                  value={patientCaseData.age}
                  onChange={handlePatientCaseChange}
                  style={inputStyle}
                  min="0"
                  max="50"
                  placeholder="歳"
                />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>性別</label>
                <select
                  name="sex"
                  value={patientCaseData.sex}
                  onChange={handlePatientCaseChange}
                  style={inputStyle}
                >
                  <option value="">選択してください</option>
                  <option value="オス">オス</option>
                  <option value="メス">メス</option>
                  <option value="去勢済みオス">去勢済みオス</option>
                  <option value="避妊済みメス">避妊済みメス</option>
                  <option value="未去勢オス">未去勢オス</option>
                  <option value="未避妊メス">未避妊メス</option>
                </select>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                主訴 <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="chief_complaint"
                value={patientCaseData.chief_complaint}
                onChange={handlePatientCaseChange}
                style={inputStyle}
                required={formType === "patient_case"}
                placeholder="例: 食欲不振、嘔吐"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>病歴</label>
              <textarea
                name="history"
                value={patientCaseData.history}
                onChange={handlePatientCaseChange}
                style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                placeholder="発症経過、既往歴など"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>検査所見</label>
              <textarea
                name="examination"
                value={patientCaseData.examination}
                onChange={handlePatientCaseChange}
                style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                placeholder="身体検査、血液検査、画像検査など"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>診断</label>
              <input
                type="text"
                name="diagnosis"
                value={patientCaseData.diagnosis}
                onChange={handlePatientCaseChange}
                style={inputStyle}
                placeholder="確定診断または暫定診断"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>治療</label>
              <textarea
                name="treatment"
                value={patientCaseData.treatment}
                onChange={handlePatientCaseChange}
                style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                placeholder="治療内容、処方薬など"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>経過</label>
              <textarea
                name="progress"
                value={patientCaseData.progress}
                onChange={handlePatientCaseChange}
                style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                placeholder="治療後の経過"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>メモ</label>
              <textarea
                name="memo"
                value={patientCaseData.memo}
                onChange={handlePatientCaseChange}
                style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
                placeholder="その他メモ"
              />
            </div>
          </div>

          {/* セミナーノートフォーム */}
          <div style={{ display: formType === "seminar_note" ? "block" : "none" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>
                セミナー名 <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="seminar_name"
                value={seminarNoteData.seminar_name}
                onChange={handleSeminarNoteChange}
                style={inputStyle}
                required={formType === "seminar_note"}
                placeholder="例: 小動物内科学セミナー2024"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>
                  開催日 <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="held_on"
                  value={seminarNoteData.held_on}
                  onChange={handleSeminarNoteChange}
                  style={inputStyle}
                  required={formType === "seminar_note"}
                />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>講師</label>
                <input
                  type="text"
                  name="lecturer"
                  value={seminarNoteData.lecturer}
                  onChange={handleSeminarNoteChange}
                  style={inputStyle}
                  placeholder="例: 山田太郎先生"
                />
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>テーマ</label>
              <input
                type="text"
                name="theme"
                value={seminarNoteData.theme}
                onChange={handleSeminarNoteChange}
                style={inputStyle}
                placeholder="例: 犬の慢性腎臓病の最新治療"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                内容 <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="content"
                value={seminarNoteData.content}
                onChange={handleSeminarNoteChange}
                style={{ ...inputStyle, minHeight: "200px", resize: "vertical" }}
                required={formType === "seminar_note"}
                placeholder="セミナーの内容、学んだこと、メモなど"
              />
            </div>
          </div>

          {/* 送信ボタン */}
          <div style={{ marginTop: "20px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
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
              type="submit"
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#4CAF50",
                color: "white",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "作成中..." : "作成"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

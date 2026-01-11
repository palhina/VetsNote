import { memo } from "react";
import {
  inputStyle,
  labelStyle,
  fieldStyle,
  textareaStyle,
} from "../styles/formStyles";

export interface PatientCaseFormData {
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

export const initialPatientCaseData: PatientCaseFormData = {
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

interface Props {
  data: PatientCaseFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
}

export const PatientCaseForm = memo(
  ({ data, onChange, required = true }: Props) => {
    return (
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>
              動物種 {required && <span style={{ color: "red" }}>*</span>}
            </label>
            <select
              name="animal_type"
              value={data.animal_type}
              onChange={onChange}
              style={inputStyle}
              required={required}
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
              value={data.breed}
              onChange={onChange}
              style={inputStyle}
              placeholder="例: トイプードル"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>年齢</label>
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={onChange}
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
              value={data.sex}
              onChange={onChange}
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
            主訴 {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <input
            type="text"
            name="chief_complaint"
            value={data.chief_complaint}
            onChange={onChange}
            style={inputStyle}
            required={required}
            placeholder="例: 食欲不振、嘔吐"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>病歴</label>
          <textarea
            name="history"
            value={data.history}
            onChange={onChange}
            style={textareaStyle}
            placeholder="発症経過、既往歴など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>検査所見</label>
          <textarea
            name="examination"
            value={data.examination}
            onChange={onChange}
            style={textareaStyle}
            placeholder="身体検査、血液検査、画像検査など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>診断</label>
          <input
            type="text"
            name="diagnosis"
            value={data.diagnosis}
            onChange={onChange}
            style={inputStyle}
            placeholder="確定診断または暫定診断"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>治療</label>
          <textarea
            name="treatment"
            value={data.treatment}
            onChange={onChange}
            style={textareaStyle}
            placeholder="治療内容、処方薬など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>経過</label>
          <textarea
            name="progress"
            value={data.progress}
            onChange={onChange}
            style={textareaStyle}
            placeholder="治療後の経過"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>メモ</label>
          <textarea
            name="memo"
            value={data.memo}
            onChange={onChange}
            style={textareaStyle}
            placeholder="その他メモ"
          />
        </div>
      </div>
    );
  }
);

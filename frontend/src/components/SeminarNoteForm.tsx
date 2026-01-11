import { memo } from "react";
import {
  inputStyle,
  labelStyle,
  fieldStyle,
  largeTextareaStyle,
} from "../styles/formStyles";

export interface SeminarNoteFormData {
  seminar_name: string;
  held_on: string;
  lecturer: string;
  theme: string;
  content: string;
}

export const initialSeminarNoteData: SeminarNoteFormData = {
  seminar_name: "",
  held_on: "",
  lecturer: "",
  theme: "",
  content: "",
};

interface Props {
  data: SeminarNoteFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

export const SeminarNoteForm = memo(
  ({ data, onChange, required = true }: Props) => {
    return (
      <div>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            セミナー名 {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <input
            type="text"
            name="seminar_name"
            value={data.seminar_name}
            onChange={onChange}
            style={inputStyle}
            required={required}
            placeholder="例: 小動物内科学セミナー2024"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>
              開催日 {required && <span style={{ color: "red" }}>*</span>}
            </label>
            <input
              type="date"
              name="held_on"
              value={data.held_on}
              onChange={onChange}
              style={inputStyle}
              required={required}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>講師</label>
            <input
              type="text"
              name="lecturer"
              value={data.lecturer}
              onChange={onChange}
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
            value={data.theme}
            onChange={onChange}
            style={inputStyle}
            placeholder="例: 犬の慢性腎臓病の最新治療"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            内容 {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <textarea
            name="content"
            value={data.content}
            onChange={onChange}
            style={largeTextareaStyle}
            required={required}
            placeholder="セミナーの内容、学んだこと、メモなど"
          />
        </div>
      </div>
    );
  }
);

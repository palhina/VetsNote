import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { SeminarNote } from "../types";

interface SeminarNoteFormData {
  seminar_name: string;
  held_on: string;
  lecturer: string;
  theme: string;
  content: string;
}

export const SeminarNoteEditPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { execute: fetchNote, isLoading: fetchLoading } = useApiRequest<SeminarNote>();
  const { execute: updateNote, isLoading: updateLoading } = useApiRequest<SeminarNote>();

  const [formData, setFormData] = useState<SeminarNoteFormData>({
    seminar_name: "",
    held_on: "",
    lecturer: "",
    theme: "",
    content: "",
  });

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNote(`/api/seminar-notes/${id}`, { method: "GET" });
        setFormData({
          seminar_name: data.seminar_name || "",
          held_on: data.held_on || "",
          lecturer: data.lecturer || "",
          theme: data.theme || "",
          content: data.content || "",
        });
      } catch (err) {
        console.error("データの取得に失敗しました", err);
        navigate("/");
      }
    };

    if (id) {
      loadNote();
    }
  }, [id, fetchNote, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateNote(`/api/seminar-notes/${id}`, {
        method: "PUT",
        body: formData,
      });
      navigate("/");
    } catch (err) {
      console.error("更新に失敗しました", err);
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
    marginBottom: "16px",
  };

  if (fetchLoading) {
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>セミナーノートを編集</h1>

      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            セミナー名 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="seminar_name"
            value={formData.seminar_name}
            onChange={handleChange}
            style={inputStyle}
            required
            placeholder="例: 小動物内科学セミナー2024"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              開催日 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="held_on"
              value={formData.held_on}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>講師</label>
            <input
              type="text"
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
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
            value={formData.theme}
            onChange={handleChange}
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
            value={formData.content}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "250px", resize: "vertical" }}
            required
            placeholder="セミナーの内容、学んだこと、メモなど"
          />
        </div>

        {/* ボタン */}
        <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={updateLoading}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#2196F3",
              color: "white",
              cursor: updateLoading ? "not-allowed" : "pointer",
              opacity: updateLoading ? 0.7 : 1,
              fontSize: "16px",
            }}
          >
            {updateLoading ? "更新中..." : "更新"}
          </button>
        </div>
      </form>
    </div>
  );
});

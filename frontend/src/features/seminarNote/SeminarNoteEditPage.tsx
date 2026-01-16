import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import {
  SeminarNoteForm,
  initialSeminarNoteData,
} from "./SeminarNoteForm";
import type { SeminarNoteFormData } from "./SeminarNoteForm";
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from "../../styles/formStyles";
import type { SeminarNote } from "../../types";

export const SeminarNoteEditPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { execute: fetchNote, isLoading: fetchLoading } =
    useApiRequest<SeminarNote>();
  const { execute: updateNote, isLoading: updateLoading } =
    useApiRequest<SeminarNote>();

  const [formData, setFormData] =
    useState<SeminarNoteFormData>(initialSeminarNoteData);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNote(`/api/seminar-notes/${id}`, {
          method: "GET",
        });
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
        body: formData as unknown as Record<string, unknown>,
      });
      navigate("/");
    } catch (err) {
      console.error("更新に失敗しました", err);
    }
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
        <SeminarNoteForm data={formData} onChange={handleChange} />

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
            disabled={updateLoading}
            style={{
              ...primaryButtonStyle,
              backgroundColor: "#2196F3",
              cursor: updateLoading ? "not-allowed" : "pointer",
              opacity: updateLoading ? 0.7 : 1,
            }}
          >
            {updateLoading ? "更新中..." : "更新"}
          </button>
        </div>
      </form>
    </div>
  );
});

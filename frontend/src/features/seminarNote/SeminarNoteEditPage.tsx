import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Card } from "../../components/layout/Card";
import { Button, Loading } from "../../components/ui";
import {
  SeminarNoteForm,
  initialSeminarNoteData,
} from "./SeminarNoteForm";
import type { SeminarNoteFormData } from "./SeminarNoteForm";
import type { SeminarNote } from "../../types";

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

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
      <PageLayout title="セミナーノートを編集" narrow>
        <Loading />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="セミナーノートを編集" narrow>
      <Card>
        <form onSubmit={handleSubmit}>
          <SeminarNoteForm data={formData} onChange={handleChange} />

          <ButtonGroup>
            <Button type="button" variant="ghost" onClick={() => navigate("/")}>
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="secondary"
              isLoading={updateLoading}
              loadingText="更新中..."
            >
              更新
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </PageLayout>
  );
});

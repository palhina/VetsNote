import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Card } from "../../components/layout/Card";
import { Button, Loading } from "../../components/ui";
import {
  PatientCaseForm,
  initialPatientCaseData,
} from "./PatientCaseForm";
import type { PatientCaseFormData } from "./PatientCaseForm";
import type { PatientCase } from "../../types";

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

export const PatientCaseEditPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { execute: fetchCase, isLoading: fetchLoading } =
    useApiRequest<PatientCase>();
  const { execute: updateCase, isLoading: updateLoading } =
    useApiRequest<PatientCase>();

  const [formData, setFormData] =
    useState<PatientCaseFormData>(initialPatientCaseData);

  useEffect(() => {
    const loadCase = async () => {
      try {
        const data = await fetchCase(`/api/patient-cases/${id}`, {
          method: "GET",
        });
        setFormData({
          animal_type: data.animal_type || "",
          breed: data.breed || "",
          age: data.age?.toString() || "",
          sex: data.sex || "",
          chief_complaint: data.chief_complaint || "",
          history: data.history || "",
          examination: data.examination || "",
          diagnosis: data.diagnosis || "",
          treatment: data.treatment || "",
          progress: data.progress || "",
          memo: data.memo || "",
        });
      } catch (err) {
        console.error("データの取得に失敗しました", err);
        navigate("/");
      }
    };

    if (id) {
      loadCase();
    }
  }, [id, fetchCase, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age, 10) : null,
      };
      await updateCase(`/api/patient-cases/${id}`, {
        method: "PUT",
        body: payload,
      });
      navigate("/");
    } catch (err) {
      console.error("更新に失敗しました", err);
    }
  };

  if (fetchLoading) {
    return (
      <PageLayout title="症例を編集" narrow>
        <Loading />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="症例を編集" narrow>
      <Card>
        <form onSubmit={handleSubmit}>
          <PatientCaseForm data={formData} onChange={handleChange} />

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

import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Card } from "../../components/layout/Card";
import { Button } from "../../components/ui";
import {
  PatientCaseForm,
  initialPatientCaseData,
} from "../patientCase/PatientCaseForm";
import type { PatientCaseFormData } from "../patientCase/PatientCaseForm";
import {
  SeminarNoteForm,
  initialSeminarNoteData,
} from "../seminarNote/SeminarNoteForm";
import type { SeminarNoteFormData } from "../seminarNote/SeminarNoteForm";
import type { PatientCase, SeminarNote } from "../../types";

type FormType = "patient_case" | "seminar_note";

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[700]};

  input {
    margin-right: ${({ theme }) => theme.spacing[2]};
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

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
    <PageLayout title="新規作成" narrow>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="formType"
            value="patient_case"
            checked={formType === "patient_case"}
            onChange={() => setFormType("patient_case")}
          />
          症例
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="formType"
            value="seminar_note"
            checked={formType === "seminar_note"}
            onChange={() => setFormType("seminar_note")}
          />
          セミナーノート
        </RadioLabel>
      </RadioGroup>

      <Card>
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

          <ButtonGroup>
            <Button type="button" variant="ghost" onClick={() => navigate("/")}>
              キャンセル
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="作成中..."
            >
              作成
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </PageLayout>
  );
});

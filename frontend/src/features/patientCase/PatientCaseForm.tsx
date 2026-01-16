import { memo } from "react";
import styled from "styled-components";
import { Input, Select, TextArea, FormField } from "../../components/ui";

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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const PatientCaseForm = memo(
  ({ data, onChange, required = true }: Props) => {
    return (
      <div>
        <GridWrapper>
          <FormField label="動物種" required={required}>
            <Select
              name="animal_type"
              value={data.animal_type}
              onChange={onChange}
              required={required}
              fullWidth
            >
              <option value="">選択してください</option>
              <option value="犬">犬</option>
              <option value="猫">猫</option>
              <option value="ウサギ">ウサギ</option>
              <option value="ハムスター">ハムスター</option>
              <option value="鳥">鳥</option>
              <option value="その他">その他</option>
            </Select>
          </FormField>

          <FormField label="品種">
            <Input
              type="text"
              name="breed"
              value={data.breed}
              onChange={onChange}
              placeholder="例: トイプードル"
              fullWidth
            />
          </FormField>

          <FormField label="年齢">
            <Input
              type="number"
              name="age"
              value={data.age}
              onChange={onChange}
              min={0}
              max={50}
              placeholder="歳"
              fullWidth
            />
          </FormField>

          <FormField label="性別">
            <Select
              name="sex"
              value={data.sex}
              onChange={onChange}
              fullWidth
            >
              <option value="">選択してください</option>
              <option value="オス">オス</option>
              <option value="メス">メス</option>
              <option value="去勢済みオス">去勢済みオス</option>
              <option value="避妊済みメス">避妊済みメス</option>
              <option value="未去勢オス">未去勢オス</option>
              <option value="未避妊メス">未避妊メス</option>
            </Select>
          </FormField>
        </GridWrapper>

        <FormField label="主訴" required={required}>
          <Input
            type="text"
            name="chief_complaint"
            value={data.chief_complaint}
            onChange={onChange}
            required={required}
            placeholder="例: 食欲不振、嘔吐"
            fullWidth
          />
        </FormField>

        <FormField label="病歴">
          <TextArea
            name="history"
            value={data.history}
            onChange={onChange}
            placeholder="発症経過、既往歴など"
            fullWidth
          />
        </FormField>

        <FormField label="検査所見">
          <TextArea
            name="examination"
            value={data.examination}
            onChange={onChange}
            placeholder="身体検査、血液検査、画像検査など"
            fullWidth
          />
        </FormField>

        <FormField label="診断">
          <Input
            type="text"
            name="diagnosis"
            value={data.diagnosis}
            onChange={onChange}
            placeholder="確定診断または暫定診断"
            fullWidth
          />
        </FormField>

        <FormField label="治療">
          <TextArea
            name="treatment"
            value={data.treatment}
            onChange={onChange}
            placeholder="治療内容、処方薬など"
            fullWidth
          />
        </FormField>

        <FormField label="経過">
          <TextArea
            name="progress"
            value={data.progress}
            onChange={onChange}
            placeholder="治療後の経過"
            fullWidth
          />
        </FormField>

        <FormField label="メモ">
          <TextArea
            name="memo"
            value={data.memo}
            onChange={onChange}
            placeholder="その他メモ"
            fullWidth
          />
        </FormField>
      </div>
    );
  }
);

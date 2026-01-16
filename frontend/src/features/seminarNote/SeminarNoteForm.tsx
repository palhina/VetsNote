import { memo } from "react";
import styled from "styled-components";
import { Input, TextArea, FormField } from "../../components/ui";

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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const LargeTextArea = styled(TextArea)`
  min-height: 200px;
`;

export const SeminarNoteForm = memo(
  ({ data, onChange, required = true }: Props) => {
    return (
      <div>
        <FormField label="セミナー名" required={required}>
          <Input
            type="text"
            name="seminar_name"
            value={data.seminar_name}
            onChange={onChange}
            required={required}
            placeholder="例: 小動物内科学セミナー2024"
            fullWidth
          />
        </FormField>

        <GridWrapper>
          <FormField label="開催日" required={required}>
            <Input
              type="date"
              name="held_on"
              value={data.held_on}
              onChange={onChange}
              required={required}
              fullWidth
            />
          </FormField>

          <FormField label="講師">
            <Input
              type="text"
              name="lecturer"
              value={data.lecturer}
              onChange={onChange}
              placeholder="例: 山田太郎先生"
              fullWidth
            />
          </FormField>
        </GridWrapper>

        <FormField label="テーマ">
          <Input
            type="text"
            name="theme"
            value={data.theme}
            onChange={onChange}
            placeholder="例: 犬の慢性腎臓病の最新治療"
            fullWidth
          />
        </FormField>

        <FormField label="内容" required={required}>
          <LargeTextArea
            name="content"
            value={data.content}
            onChange={onChange}
            required={required}
            placeholder="セミナーの内容、学んだこと、メモなど"
            fullWidth
          />
        </FormField>
      </div>
    );
  }
);

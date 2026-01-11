import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import {
  PatientCaseForm,
  initialPatientCaseData,
} from "./PatientCaseForm";
import type { PatientCaseFormData } from "./PatientCaseForm";
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from "../styles/formStyles";
import type { PatientCase } from "../types";

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
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>症例を編集</h1>

      <form onSubmit={handleSubmit}>
        <PatientCaseForm data={formData} onChange={handleChange} />

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

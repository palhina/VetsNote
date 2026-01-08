import { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { PatientCase } from "../types";

interface PatientCaseFormData {
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

export const PatientCaseEditPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { execute: fetchCase, isLoading: fetchLoading } = useApiRequest<PatientCase>();
  const { execute: updateCase, isLoading: updateLoading } = useApiRequest<PatientCase>();

  const [formData, setFormData] = useState<PatientCaseFormData>({
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
  });

  useEffect(() => {
    const loadCase = async () => {
      try {
        const data = await fetchCase(`/api/patient-cases/${id}`, { method: "GET" });
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      <h1>症例を編集</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              動物種 <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="animal_type"
              value={formData.animal_type}
              onChange={handleChange}
              style={inputStyle}
              required
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
              value={formData.breed}
              onChange={handleChange}
              style={inputStyle}
              placeholder="例: トイプードル"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>年齢</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
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
              value={formData.sex}
              onChange={handleChange}
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
            主訴 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="chief_complaint"
            value={formData.chief_complaint}
            onChange={handleChange}
            style={inputStyle}
            required
            placeholder="例: 食欲不振、嘔吐"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>病歴</label>
          <textarea
            name="history"
            value={formData.history}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="発症経過、既往歴など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>検査所見</label>
          <textarea
            name="examination"
            value={formData.examination}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="身体検査、血液検査、画像検査など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>診断</label>
          <input
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            style={inputStyle}
            placeholder="確定診断または暫定診断"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>治療</label>
          <textarea
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="治療内容、処方薬など"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>経過</label>
          <textarea
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="治療後の経過"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>メモ</label>
          <textarea
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder="その他メモ"
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

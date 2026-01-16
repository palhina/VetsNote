import { memo, useState, useMemo } from "react";
import type { PatientCase } from "../../types";

type SortOrder = "asc" | "desc";

interface Props {
  cases: PatientCase[];
  onSelect: (patientCase: PatientCase) => void;
}

export const PatientCaseList = memo(({ cases, onSelect }: Props) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const comparison =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [cases, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>症例一覧</h2>

      {cases.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <button
            onClick={toggleSortOrder}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "#e0e0e0",
            }}
          >
            作成日 {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>
      )}

      {cases.length === 0 ? (
        <p>症例がありません</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sortedCases.map((c) => (
            <li
              key={c.id}
              onClick={() => onSelect(c)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <strong>
                {c.animal_type} {c.breed && `(${c.breed})`}
              </strong>
              {c.age && <span> - {c.age}歳</span>}
              {c.sex && <span> - {c.sex}</span>}
              <p style={{ margin: "8px 0 0", color: "#666" }}>
                主訴: {c.chief_complaint || "-"}
              </p>
              {c.diagnosis && (
                <p style={{ margin: "4px 0 0", color: "#333" }}>
                  診断: {c.diagnosis}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

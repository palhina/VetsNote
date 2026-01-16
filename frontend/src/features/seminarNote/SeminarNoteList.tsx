import { memo, useState, useMemo } from "react";
import type { SeminarNote } from "../../types";

type SortKey = "held_on" | "created_at" | "seminar_name";
type SortOrder = "asc" | "desc";

interface Props {
  notes: SeminarNote[];
  onSelect: (note: SeminarNote) => void;
}

export const SeminarNoteList = memo(({ notes, onSelect }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("held_on");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "held_on":
          comparison =
            new Date(a.held_on).getTime() - new Date(b.held_on).getTime();
          break;
        case "created_at":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "seminar_name":
          comparison = a.seminar_name.localeCompare(b.seminar_name, "ja");
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [notes, sortKey, sortOrder]);

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const getSortLabel = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>セミナーノート一覧</h2>

      {notes.length > 0 && (
        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <button
            onClick={() => handleSortChange("held_on")}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: sortKey === "held_on" ? "#e0e0e0" : "white",
            }}
          >
            開催日{getSortLabel("held_on")}
          </button>
          <button
            onClick={() => handleSortChange("created_at")}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: sortKey === "created_at" ? "#e0e0e0" : "white",
            }}
          >
            作成日{getSortLabel("created_at")}
          </button>
          <button
            onClick={() => handleSortChange("seminar_name")}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: sortKey === "seminar_name" ? "#e0e0e0" : "white",
            }}
          >
            セミナー名{getSortLabel("seminar_name")}
          </button>
        </div>
      )}

      {notes.length === 0 ? (
        <p>セミナーノートがありません</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sortedNotes.map((n) => (
            <li
              key={n.id}
              onClick={() => onSelect(n)}
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
              <strong>{n.seminar_name}</strong>
              <p style={{ margin: "4px 0", color: "#888", fontSize: "14px" }}>
                {n.held_on}
                {n.lecturer && ` | 講師: ${n.lecturer}`}
              </p>
              {n.theme && (
                <p style={{ margin: "4px 0 0", color: "#666" }}>
                  テーマ: {n.theme}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

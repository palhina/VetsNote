import { memo } from "react";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isSearching: boolean;
  resultCount?: {
    cases: number;
    notes: number;
  };
}

export const SearchBar = memo(
  ({
    query,
    onChange,
    onSearch,
    onClear,
    onKeyDown,
    isSearching,
    resultCount,
  }: SearchBarProps) => {
    return (
      <div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="検索... (スペース=AND, カンマ=OR)"
            style={{
              flex: 1,
              maxWidth: "400px",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
          <button
            onClick={onSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            検索
          </button>
          {isSearching && (
            <button
              onClick={onClear}
              style={{
                padding: "10px 20px",
                backgroundColor: "#757575",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              クリア
            </button>
          )}
        </div>

        {isSearching && resultCount && (
          <p style={{ marginTop: "12px", color: "#666" }}>
            検索結果: 症例 {resultCount.cases}件、セミナー {resultCount.notes}件
          </p>
        )}

        {!isSearching && (
          <p style={{ marginTop: "8px", fontSize: "12px", color: "#999" }}>
            例: 「犬 骨折」= 両方含む / 「犬,猫」= どちらか含む
          </p>
        )}
      </div>
    );
  }
);

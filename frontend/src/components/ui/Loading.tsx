import { memo } from "react";

interface LoadingProps {
  message?: string;
}

//ローディング中表示
export const Loading = memo(({ message = "読み込み中..." }: LoadingProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "20px 0",
        color: "#666",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "16px",
          height: "16px",
          border: "2px solid #ccc",
          borderTopColor: "#2196F3",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span>{message}</span>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
});

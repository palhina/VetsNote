import type { CSSProperties } from "react";

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

export const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "4px",
  fontWeight: "bold",
  fontSize: "14px",
};

export const fieldStyle: CSSProperties = {
  marginBottom: "16px",
};

export const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};

export const largeTextareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "250px",
  resize: "vertical",
};

export const buttonStyle: CSSProperties = {
  padding: "12px 24px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export const primaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
};

export const secondaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  border: "1px solid #ccc",
  backgroundColor: "white",
};

import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  style = {},
  disabled = false,
}) => {
  const baseStyle = {
    padding: "0.7rem 1.25rem",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.875rem",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 15px rgba(56, 189, 248, 0.25)",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    danger: {
      background: "#ef4444",
      color: "#ffffff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
};

export default Button;

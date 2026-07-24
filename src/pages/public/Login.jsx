import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Copy, Check, Mail, Lock, ShieldAlert } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Invalid credentials");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("admin@nexus.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1500);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText("admin123");
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 180px)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2.5rem",
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 10px 30px rgba(120, 134, 74, 0.04)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "#F2F4EB",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            color: "var(--accent-olive)",
          }}
        >
          <ShieldAlert size={26} />
        </div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em", margin: "0" }}>
          Admin Access Portal
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            marginTop: "0.5rem",
            margin: "8px 0 0 0",
          }}
        >
          Authorization required to access inventory management.
        </p>
      </div>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            fontSize: "0.85rem",
            marginBottom: "1.5rem",
            fontWeight: "500",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "var(--text-main)",
              marginBottom: "0.4rem",
            }}
          >
            Admin Email
          </label>
          <div style={{ position: "relative" }}>
            <Mail
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94A3B8",
              }}
            />
            <input
              type="email"
              placeholder="admin@nexus.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.8rem",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                outline: "none",
                fontSize: "0.9rem",
                color: "var(--text-main)",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-olive)";
                e.target.style.boxShadow = "0 0 0 3px rgba(106, 123, 93, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "var(--text-main)",
              marginBottom: "0.4rem",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94A3B8",
              }}
            />
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.8rem",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                outline: "none",
                fontSize: "0.9rem",
                color: "var(--text-main)",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-olive)";
                e.target.style.boxShadow = "0 0 0 3px rgba(106, 123, 93, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 18px",
            background: "var(--accent-olive)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-button)",
            fontSize: "0.95rem",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "0.5rem",
            transition: "var(--transition-smooth)",
            boxShadow: "0 4px 12px rgba(106, 123, 93, 0.15)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "var(--accent-hover)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(106, 123, 93, 0.25)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "var(--accent-olive)";
            e.target.style.transform = "none";
            e.target.style.boxShadow = "0 4px 12px rgba(106, 123, 93, 0.15)";
          }}
        >
          Authorize & Sign In
        </button>
      </form>

      {}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.2rem",
          background: "#F9FAFB",
          borderRadius: "12px",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          border: "1px dashed var(--border-color)",
        }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "1rem",
            lineHeight: "1.4",
            margin: "0 0 12px 0",
          }}
        >
          For demonstration purposes, please use the following credentials to access the Admin Portal.
        </p>
        <p
          style={{
            fontWeight: "700",
            color: "var(--text-main)",
            margin: "0 0 10px 0",
          }}
        >
          🔑 Demo Credentials:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            }}
          >
            <span>
              Email: <code style={{ color: "var(--accent-olive)", fontWeight: "600" }}>admin@nexus.com</code>
            </span>
            <button
              type="button"
              onClick={copyEmail}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: copiedEmail ? "#10B981" : "#94A3B8",
                display: "flex",
                alignItems: "center",
                padding: "2px",
                transition: "color 0.2s ease",
              }}
              title="Copy Email"
            >
              {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            }}
          >
            <span>
              Password: <code style={{ color: "var(--accent-olive)", fontWeight: "600" }}>admin123</code>
            </span>
            <button
              type="button"
              onClick={copyPassword}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: copiedPassword ? "#10B981" : "#94A3B8",
                display: "flex",
                alignItems: "center",
                padding: "2px",
                transition: "color 0.2s ease",
              }}
              title="Copy Password"
            >
              {copiedPassword ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.72rem",
            color: "#94A3B8",
            marginTop: "2rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "32px 0 0 0",
          }}
        >
          Access restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
};

export default Login;

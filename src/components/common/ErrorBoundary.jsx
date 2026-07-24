import React, { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an uncaught exception:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            background: "var(--bg-app)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-color)",
              borderRadius: "24px",
              padding: "3rem",
              maxWidth: "500px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
            }}
          >
            <AlertTriangle size={54} color="var(--primary-olive)" style={{ marginBottom: "1.5rem" }} />
            <h2 style={{ color: "var(--text-main)", fontSize: "1.5rem", fontWeight: 800, margin: "0 0 1rem 0" }}>
              Something Went Wrong
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", margin: "0 0 2rem 0" }}>
              An unexpected error occurred in the application view. Please reload or contact administration.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--primary-olive)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "var(--radius-button)",
                padding: "12px 28px",
                fontSize: "0.95rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--primary-olive-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--primary-olive)";
              }}
            >
              <RefreshCw size={16} />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

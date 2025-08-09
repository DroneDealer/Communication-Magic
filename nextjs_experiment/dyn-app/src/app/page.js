"use client";

export default function IntroPage() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1000px", textAlign: "center" }}>
        <h1>Welcome to My Next.js App!</h1>
        <p>This is the intro page, your first stop.</p>
        <img
          src="/cover.png"
          alt="COVER"
          style={{ width: "100%", height: "auto", marginBottom: "1.5rem" }}
        />
        <a
          href="/emoji"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "white",
            color: "#333",
            fontWeight: "600",
            textDecoration: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            userSelect: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          Go to Emoji Keyboard
        </a>
      </div>
    </main>
  );
}

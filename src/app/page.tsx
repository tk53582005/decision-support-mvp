import Link from "next/link";
import { UI_TEXT } from "@/constants/uiText";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>{UI_TEXT.appName}</h1>
      <p style={{ marginTop: 8 }}>MVP</p>
      <div style={{ marginTop: 16 }}>
        <Link href="/decision/new" style={{ color: "#2563eb", textDecoration: "underline" }}>
          {UI_TEXT.nav.newDecision}
        </Link>
      </div>
    </main>
  );
}
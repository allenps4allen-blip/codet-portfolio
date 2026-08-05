export const metadata = {
  title: "Dashboard — CODET",
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#050505" }}>
        {children}
      </body>
    </html>
  );
}

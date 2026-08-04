export const metadata = {
  title: "Admin — CODET",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#050505" }}>
        {children}
      </body>
    </html>
  );
}

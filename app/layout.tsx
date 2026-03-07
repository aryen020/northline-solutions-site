import "./globals.css";

export const metadata = {
  title: "Northline Solutions – Altijd bereikbaar",
  description: "24/7 digitale receptionist voor lokale bedrijven"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

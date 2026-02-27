import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Binderr — Strategy Framework",
  description: "Global infrastructure layer connecting businesses with trusted financial, legal, and compliance providers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/navbar";

export const metadata: Metadata = {
  title: "Filthy App",
  description: "A Filthy App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <NavBar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Filthy App",
  description: "A Filthy App",
};

// Layout principal de l'application Next.js avec la barre de navigation et le pied de page
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "LANDO NORRIS | OFFICIAL WEBSITE",
  description: "Official website of Lando Norris - F1 Driver, Creator, Gamer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased bg-black text-white selection:bg-accent selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

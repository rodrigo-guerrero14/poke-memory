import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import "./globals.css";

const balooDisplay = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

const nunitoBody = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Pokémon",
  description: "Encuentra las parejas de Pokémon antes de que se te acabe la memoria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${balooDisplay.variable} ${nunitoBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-poke-pattern font-body">{children}</body>
    </html>
  );
}

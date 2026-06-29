import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { sitio } from "@/data/config";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-utility",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${sitio.dominio}`),
  title: {
    default: `${sitio.nombre} — Estudio diario de la Torá`,
    template: `%s — ${sitio.nombre}`,
  },
  description: sitio.descripcion,
  openGraph: {
    title: `${sitio.nombre} — Estudio diario de la Torá`,
    description: sitio.descripcion,
    url: `https://${sitio.dominio}`,
    siteName: sitio.nombre,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${sitio.nombre} — Estudio diario de la Torá`,
    description: sitio.descripcion,
  },
  alternates: {
    canonical: `https://${sitio.dominio}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

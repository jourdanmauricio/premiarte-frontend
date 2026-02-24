import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/shared/navBar/NavBar";
import { Footer } from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/whatsAppButton/WhatsAppButton";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Premiarte, Trofeos, Venta y Fabricacion de Trofeos, Medallas, Reconocimientos, Placas Grabadas, Copas, Promocionales, Venta, Fabrica y Diseño de trofeos, La Plata";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.premiarte.com.ar"),
  title: "Premiarte",
  description: siteDescription,
  keywords: [
    "Premiarte",
    "Trofeos",
    "Venta y Fabricacion de Trofeos",
    "Medallas",
    "Reconocimientos",
    "Placas Grabadas",
    "Copas",
    "Enmarcados",
    "Promocionales",
    "Venta",
    "Fabrica y Diseño de trofeos",
    "La Plata",
  ],
  authors: [{ name: "Premiarte" }],
  creator: "Premiarte",
  publisher: "Premiarte",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  classification: siteDescription,
  abstract: siteDescription,
  generator: "Premiarte.com.ar | Premiarte",
  openGraph: {
    title: "Premiarte",
    description: siteDescription,
    url: "https://www.premiarte.com.ar",
    siteName: "www.premiarte.com.ar",
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_ES", "en_US"],
    images: [{ url: "/favicon.ico" }],
  },
  other: {
    "content-language": "es",
    language: "es",
    distribution: "Global",
    subject: "Premiarte.com.ar | Premiarte",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10">
          {/* Gradiente base - este está bien */}
          <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black"></div>

          {/* Efectos optimizados usando CSS puro en lugar de blur-3xl */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 75% 67%, rgba(249, 115, 22, 0.03) 0%, transparent 50%)
                `,
            }}
          ></div>
        </div>
        <SessionProvider>
          <NavBar />
          <main className="m-auto">{children}</main>
        </SessionProvider>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
    </ViewTransitions>
  );
}

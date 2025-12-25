import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "../GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general",
  display: "swap",
});

const ferron = localFont({
  src: [
    {
      path: "../Ferron-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ferron",
  display: "swap",
});

const allison = localFont({
  src: [
    {
      path: "../Allison-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-allison",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Tuz | Portafolio",
  description:
    "Landing page de portafolio de Daniel Tuz - Desarrollador Web Frontend.",
  icons: {
    icon: "/mislogos/logodaniel.png",
    apple: "/mislogos/logodaniel.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth bg-zinc-950">
      <body
        className={`${generalSans.variable} ${ferron.variable} ${allison.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

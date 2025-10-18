import type { Metadata } from "next";
import "./globals.css";
import "@/styles/index.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "@/components/_common/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://radwananik.com"),
  title: {
    default: "Radwan Ahmed || Software Engineer (Front-End)",
    template: "%s | Radwan Ahmed",
  },
  description:
    "Hi, I am Radwan Ahmed — a Software Engineer (Front-End) passionate about creating seamless digital experiences. I specialize in React.js, Next.js, TypeScript, and modern UI development, delivering responsive, accessible, and high-performing web applications.",
  keywords:
    "Radwan Ahmed, Radwan Anik, radwan503, front-end developer, software engineer, web developer, React.js developer, Next.js portfolio, TypeScript developer, JavaScript developer, UI engineer, responsive web design, Bangladesh developer, front end engineer, HTML, CSS, Tailwind, Ant Design, UI/UX, portfolio developer",
  authors: [{ name: "Radwan Ahmed", url: "https://radwananik.com" }],
  creator: "Radwan Ahmed",
  publisher: "Radwan Ahmed",

  openGraph: {
    title: "Radwan Ahmed | Portfolio | Software Engineer (Front-End)",
    description:
      "Explore the portfolio of Radwan Ahmed — a Front-End Software Engineer skilled in React.js, Next.js, and modern UI frameworks. Transforming ideas into interactive digital experiences.",
    url: "https://radwananik.com",
    siteName: "Radwan Ahmed | Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://radwananik.com/og-image.jpg", // replace with your actual preview image
        alt: "Radwan Ahmed Portfolio Preview",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@anik_radwan",
    creator: "@anik_radwan",
    title: "Radwan Ahmed | Software Engineer (Front-End)",
    description:
      "Explore the work and projects of Radwan Ahmed — a Front-End Software Engineer with expertise in React, Next.js, and modern web technologies.",
    images: ["https://radwananik.com/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "your-google-site-verification-code", // (optional: if you verify domain in Google Search Console)
  },

  alternates: {
    canonical: "https://radwananik.com",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  other: {
    "copyright": "© 2025 Radwan Ahmed",
    "language": "English",
    "content-language": "en",
    "abstract":
      "Portfolio of Radwan Ahmed — Software Engineer (Front-End) specializing in React.js, Next.js, TypeScript, and UI/UX design.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Header />
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}

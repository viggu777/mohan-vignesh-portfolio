import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Spotlight } from "@/components/Spotlight";
import { CommandMenu } from "@/components/CommandMenu";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohanvignesh.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Mohan Vignesh — Full Stack Developer",
    template: "%s · Mohan Vignesh",
  },
  description:
    "Mohan Vignesh (Kola Mohan Vignesh Kumar) — Full Stack Developer building MERN, Next.js, and React Native applications with auth, RBAC, payments, deployment, and practical Generative AI features. Open to Software Developer Internships.",
  keywords: [
    "Mohan Vignesh",
    "Full Stack Developer",
    "MERN",
    "Next.js",
    "React Native",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Kola Mohan Vignesh Kumar", url: "https://github.com/viggu777" }],
  creator: "Kola Mohan Vignesh Kumar",
  openGraph: {
    title: "Mohan Vignesh — Full Stack Developer",
    description:
      "Building real-world web & mobile apps with MERN & Next.js. Auth, RBAC, payments, deployment, with practical GenAI features.",
    type: "website",
    locale: "en_IN",
    siteName: "Mohan Vignesh — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohan Vignesh — Full Stack Developer",
    description: "MERN, Next.js, React Native, and practical Generative AI features.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // To enable absolute OG URLs + canonical, set NEXT_PUBLIC_SITE_URL and add metadataBase here.
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#04060c] text-slate-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <Spotlight />
        <Navbar />
        <div className="flex min-h-full flex-1 flex-col pt-16">
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CommandMenu />
      </body>
    </html>
  );
}

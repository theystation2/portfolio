import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WhimsyButton } from "@/components/WhimsyButton";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack Horton — Design",
  description: "Staff Content Designer at Stripe. 10+ years in UX writing, information architecture, and content systems. Based in Montreal.",
  keywords: ["content designer", "UX writer", "information architecture", "content strategy", "design systems", "Stripe", "Shopify", "Wealthsimple", "content design", "product design"],
  authors: [{ name: "Jack Horton" }],
  openGraph: {
    title: "Jack Horton — Design Portfolio",
    description: "Staff Content Designer at Stripe. Information architecture, content systems, UX writing, and operational automation.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jack Horton",
              jobTitle: "Staff Content Designer",
              worksFor: { "@type": "Organization", name: "Stripe" },
              url: "https://portfolio.vercelapp.stripe.dev",
              sameAs: [
                "https://www.linkedin.com/in/jack-horton-84a285140/",
                "https://github.com/theystation2/portfolio",
              ],
              address: { "@type": "PostalAddress", addressLocality: "Montreal", addressRegion: "QC", addressCountry: "CA" },
              knowsAbout: [
                "Content Design",
                "UX Writing",
                "Information Architecture",
                "Content Strategy",
                "Content Systems",
                "Design Systems",
                "LLM Automation",
                "Operational Automation",
                "TypeScript",
                "React",
                "Swift",
              ],
              alumniOf: { "@type": "CollegeOrUniversity", name: "University of Ottawa" },
              description: "Designer with 10+ years of experience in content design, information architecture, and content systems. Currently Staff Content Designer at Stripe focused on billing, tax, and operational automation.",
            }),
          }}
        />
        <ModeSwitcher />
        {children}
        <ThemeToggle />
        <WhimsyButton />
      </body>
    </html>
  );
}

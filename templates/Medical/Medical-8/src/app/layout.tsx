import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MediNova — Healthcare That Fits Your Life",
    template: "%s | MediNova",
  },
  description:
    "Order medicines, track your health, book diagnostics and access trusted healthcare from one place. MediNova — your digital healthcare marketplace.",
  keywords: [
    "online pharmacy",
    "medicines",
    "healthcare",
    "diagnostics",
    "lab tests",
    "doctor consultation",
    "wellness",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MediNova",
    title: "MediNova — Healthcare That Fits Your Life",
    description:
      "Order medicines, track your health, book diagnostics and access trusted healthcare from one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <CartProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <BottomNavigation />
        </CartProvider>
      </body>
    </html>
  );
}

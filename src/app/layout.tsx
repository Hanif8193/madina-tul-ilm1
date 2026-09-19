import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/language/LanguageProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Variable font with the optical-size axis — matches the original
  // 'Fraunces:ital,opsz,wght@0,9..144,…' Google Fonts loading, so large
  // display headings (e.g. the '&' in 'Tarbiyah & Growth') render with the
  // same high-opsz letterforms as the original about.html design.
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Urdu Nastaliq font for RTL mode. Only weight 400–700 variable is
// available; exposed as --font-noto-urdu (mapped to --font-urdu in CSS).
const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Madina-Tul-Ilm Islamic College",
    template: "%s — Madina-Tul-Ilm Islamic College",
  },
  description:
    "Authentic Islamic Education for Women & Girls. A female-focused Islamic educational institution dedicated to nurturing a generation grounded in Qur'an, Sunnah, knowledge and character.",
  openGraph: {
    title: "Madina-Tul-Ilm Islamic College",
    description:
      "Authentic Islamic Education for Women & Girls — structured learning in Qur'an and Islamic sciences through on-campus and online education.",
    type: "website",
    locale: "en_US",
  },
};

// Runs before first paint: if a saved Urdu preference exists, apply
// lang="ur" dir="rtl" immediately so there is no LTR flash on reload.
const langPrePaint = `(function(){try{var l=localStorage.getItem("mti-lang");if(l==="ur"){document.documentElement.lang="ur";document.documentElement.dir="rtl";}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${manrope.variable} ${notoUrdu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langPrePaint }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

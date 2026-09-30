import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff8f8",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bimps-open-when.vercel.app"
  ),
  title: "Open When... ❤️",
  description:
    "A handcrafted romantic keepsake filled with love, letters, and special moments made especially for you.",
  keywords: [
    "Open When",
    "Birthday Gift",
    "Love Letters",
    "Romantic Keepsake",
    "Happy Birthday",
    "Special Delivery",
  ],
  authors: [{ name: "With Love" }],
  creator: "With Love",
  openGraph: {
    title: "Open When... ❤️ | Happy Birthday, My Love",
    description:
      "I made you a little something… Every ribbon, word, and note is prepared with all my heart.",
    images: [
      {
        url: "/gift-box.jpg",
        width: 800,
        height: 800,
        alt: "Handcrafted birthday gift box wrapped in textured ivory paper with an opulent blush pink silk ribbon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open When... ❤️ | Happy Birthday, My Love",
    description: "I made you a little something… Open your gift.",
    images: ["/gift-box.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <meta name="shell-type" content="web_blank" />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased min-h-screen relative selection:bg-secondary-container selection:text-on-secondary-container">
        {children}
      </body>
    </html>
  );
}

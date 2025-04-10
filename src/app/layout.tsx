import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  title: "Blog",
  description: "A blog about my projects and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quickLinks: Record<string, string> = {
    Home: "/",
    About: "/about",
    Notes: "/notes",
    Projects: "/projects",
    LeetCode: "/leetcode",
  };

  return (
    // TODO: Add Link
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <nav className="top-0 left-0 w-full py-4 z-50">
          <div className="w-3/5 mx-auto">
            <div className="flex justify-start space-x-8">
              {Object.entries(quickLinks).map(([key, value]) => (
                <Link
                  key={key}
                  href={value}
                  className="text-white/90 hover:text-white transition-colors duration-300 relative group"
                >
                  {key}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

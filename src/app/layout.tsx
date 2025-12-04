import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Z",
  description: "Movie site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        
      </body>
    </html>
  );
}

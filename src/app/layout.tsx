import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientOnlyThemeProvider } from "@/components/client-only-theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LedgerMate | WhatsApp Assistant for Tally",
  description: "Modern SaaS dashboard for Tally users with WhatsApp automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ClientOnlyThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ClientOnlyThemeProvider>
      </body>
    </html>
  );
}

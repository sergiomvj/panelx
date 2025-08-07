import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FacePanel VPS Manager",
  description: "Painel de gerenciamento para seus projetos.",
  keywords: ["FacePanel", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Painel"],
  authors: [{ name: "Sergio Castro" }],
  openGraph: {
    title: "FacePanel VPS Manager",
    description: "Painel de gerenciamento para seus projetos.",
    siteName: "FacePanel VPS Manager",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FacePanel VPS Manager",
    description: "Painel de gerenciamento para seus projetos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

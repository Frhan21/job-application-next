import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Recruitment Dashboard",
    description: "Mini Recruitment Dashboard — Manage jobs, candidates, and hiring pipeline",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("h-full antialiased", inter.variable)}>
            <body className="min-h-full flex flex-col font-sans">
                <SessionProvider>
                    {children}
                    <Toaster richColors position="top-right" />
                </SessionProvider>
            </body>
        </html>
    );
}

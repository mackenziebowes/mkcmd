import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mkcmd.mackenziebowes.com"),
    title: "mkcmd - CLI Scaffolding for Agentic AI",
    description: "Generate type-safe boilerplates, argument parsers, and help menus instantly. Optimized for human developers and LLM function calling.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body className={`${shareTechMono.variable} font-mono antialiased`}>
                {children}
            </body>
        </html>
    );
}

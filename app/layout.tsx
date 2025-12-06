import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import { shadesOfPurple, dark } from "@clerk/themes";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://plansync.vercel.app"),
  title: {
    default: "PlanSync - Project Management Made Simple",
    template: "%s | PlanSync",
  },
  description: "Streamline your workflow with PlanSync. Intuitive Kanban boards, powerful sprint planning, and comprehensive reporting for teams of all sizes.",
  keywords: [
    "project management",
    "kanban board",
    "sprint planning",
    "agile",
    "scrum",
    "team collaboration",
    "task management",
    "workflow automation",
    "productivity tools",
  ],
  authors: [{ name: "Zain", url: "https://github.com/zainop23" }],
  creator: "Zain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://plansync.vercel.app",
    siteName: "PlanSync",
    title: "PlanSync - Project Management Made Simple",
    description: "Streamline your workflow with PlanSync. Intuitive Kanban boards, powerful sprint planning, and comprehensive reporting for teams of all sizes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlanSync - Project Management App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanSync - Project Management Made Simple",
    description: "Streamline your workflow with PlanSync. Intuitive Kanban boards, powerful sprint planning, and comprehensive reporting.",
    images: ["/og-image.png"],
    creator: "@zainop23",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: [dark,shadesOfPurple],
       variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-800",
          headerTitle: "text-blue-400",
          headerSubtitle: "text-gray-400",
        },
    }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} dotted-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header></Header>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors/>
             <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                
                <p><Link target="_blank" href={"https://github.com/zainop23"}
                className="underline"
                >Made By Zain!</Link></p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

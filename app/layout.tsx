import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { I18nProvider } from "@/lib/i18n/context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "AquaHarvest - Rooftop Rainwater Harvesting Assessment",
  description: "Professional rainwater harvesting assessment and planning tool for sustainable water management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ErrorBoundary>
          <I18nProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </I18nProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}

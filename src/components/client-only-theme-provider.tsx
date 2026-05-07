"use client"

import dynamic from "next/dynamic"

const ThemeProvider = dynamic(
  () => import("@/components/theme-provider").then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export function ClientOnlyThemeProvider({ children, ...props }: any) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}

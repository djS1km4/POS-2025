'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user-context";
import { BusinessProvider } from "@/context/business-context";
import { ThemeProvider } from "@/context/theme-context";
import { CategoryProvider } from "@/context/category-context";
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <BusinessProvider>
            <CategoryProvider>
              <UserProvider>
                  {children}
                  <Toaster />
              </UserProvider>
            </CategoryProvider>
          </BusinessProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

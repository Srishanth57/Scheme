"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

import React, { createContext, useContext, useState } from "react";

import { useTranslation } from "next-i18next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export default function RootLayout({ children }) {
  const [prompt, setPrompt] = useState("");

  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const contextValue = {
    prompt,
    setPrompt,
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContext.Provider value={contextValue}>
          <div>{children}</div>
        </AppContext.Provider>
      </body>
    </html>
  );
}

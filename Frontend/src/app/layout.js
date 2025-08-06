"use client";
import { Geist, Geist_Mono } from "next/font/google";
import React, { createContext, useContext, useState } from "react";
import Chatbot from "./(home)/component/Chatbot";

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
  const [tags, setTags] = useState();

  const contextValue = {
    tags,
    setTags,
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContext.Provider value={contextValue}>
          {children}
          <Chatbot />
        </AppContext.Provider>
      </body>
    </html>
  );
}

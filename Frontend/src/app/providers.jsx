"use client";

import React, { createContext, useContext, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "../lib/i18next"; // initializes the i18next instance app-wide
import Chatbot from "./(home)/component/Chatbot";
export const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export default function Providers({ children }) {
  const [tags, setTags] = useState();

  const contextValue = { tags, setTags };

  return (
    <ClerkProvider>
      <AppContext.Provider value={contextValue}>
        {children}
        <Chatbot />
      </AppContext.Provider>
    </ClerkProvider>
  );
}

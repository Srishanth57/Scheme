"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "lib/i18next";

export default function ClientBody({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <div>{children}</div>
    </I18nextProvider>
  );
}
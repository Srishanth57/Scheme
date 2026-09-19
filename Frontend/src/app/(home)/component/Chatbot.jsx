"use client";

import { useEffect, useRef } from "react";

/**
 * Chatbot — Loads the Botpress chatbot widget via external scripts.
 *
 * Security notes:
 * - Script URLs are sourced from environment variables (not hardcoded)
 *   to allow rotation without code changes.
 * - Scripts are cleaned up on unmount to prevent memory leaks.
 * - No visible DOM is rendered — the chatbot UI is injected by the
 *   Botpress script into its own container.
 */
function Chatbot() {
  const injectScriptRef = useRef(null);
  const configScriptRef = useRef(null);

  useEffect(() => {
    const injectUrl =
      process.env.NEXT_PUBLIC_BOTPRESS_INJECT_URL ||
      "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    const configUrl =
      process.env.NEXT_PUBLIC_BOTPRESS_CONFIG_URL ||
      "https://files.bpcontent.cloud/2025/07/23/13/20250723131832-S1MS7YVT.js";

    const injectScript = document.createElement("script");
    injectScript.src = injectUrl;
    injectScript.async = true;
    injectScriptRef.current = injectScript;

    injectScript.onload = () => {
      const configScript = document.createElement("script");
      configScript.src = configUrl;
      configScript.async = true;
      configScriptRef.current = configScript;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);

    // Cleanup on unmount to prevent memory leaks and duplicate widgets
    return () => {
      if (injectScriptRef.current && document.body.contains(injectScriptRef.current)) {
        document.body.removeChild(injectScriptRef.current);
      }
      if (configScriptRef.current && document.body.contains(configScriptRef.current)) {
        document.body.removeChild(configScriptRef.current);
      }
    };
  }, []);

  // No visible DOM — Botpress injects its own floating widget
  return null;
}

export default Chatbot;
// src/components/ElevenLabsWidget.jsx
"use client";

import { useEffect, useState } from "react";

export default function ElevenLabsWidget({ agentId }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamically inject the ElevenLabs conversational AI script
    const scriptId = "elevenlabs-convai-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
}
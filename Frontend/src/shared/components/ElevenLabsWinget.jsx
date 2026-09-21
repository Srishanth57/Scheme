// Frontend/src/shared/components/ElevenLabsWinget.jsx
"use client";

import { useEffect, useState } from "react";

export default function ElevenLabsWidget({ agentId }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Official ElevenLabs ConvAI script loader
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

  if (!isClient || !agentId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
}
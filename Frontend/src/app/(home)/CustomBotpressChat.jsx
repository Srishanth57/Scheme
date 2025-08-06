"use client";
import { useEffect, useState, useRef } from "react";

const CustomBotpressChat = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    // Check if script is already loaded
    if (window.botpressWebChat) {
      initializeBotpress();
      return;
    }

    // Load Botpress script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    scriptRef.current = script;

    script.onload = () => {
      console.log("Botpress script loaded successfully");
      initializeBotpress();
    };

    script.onerror = () => {
      console.error("Failed to load Botpress script");
      setError("Failed to load chat widget");
      setIsLoaded(false);
    };

    document.head.appendChild(script); // Use head instead of body

    return () => {
      // Cleanup
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }

      // Hide the widget if it exists
      if (window.botpressWebChat) {
        try {
          window.botpressWebChat.hide();
        } catch (e) {
          console.warn("Error hiding Botpress widget:", e);
        }
      }
    };
  }, []);

  const initializeBotpress = () => {
    try {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "688a06dc-5135-4da2-a3c0-7b3aa88ff0a8",

          // Custom styling and configuration
          theme: "prism", // or 'dark', 'light'
          themeColor: "#2563eb", // Custom primary color

          // Widget positioning and behavior
          hideWidget: false,
          disableAnimations: false,
          closeOnEscape: true,
          showUserAvatar: true,
          showUserName: true,
          enableReset: true,
          enableTranscriptDownload: false,

          // Custom CSS injection
          stylesheet: `
            /* Custom styles for the chat widget */
            .bpw-layout {
              border-radius: 12px !important;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
            }
            
            .bpw-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
              border-radius: 12px 12px 0 0 !important;
            }
            
            .bpw-header-title {
              font-weight: 600 !important;
              font-size: 16px !important;
            }
            
            .bpw-chat-container {
              background-color: #f8fafc !important;
            }
            
            .bpw-from-user .bpw-chat-bubble {
              background: #2563eb !important;
              border-radius: 18px 18px 4px 18px !important;
            }
            
            .bpw-from-bot .bpw-chat-bubble {
              background: white !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 18px 18px 18px 4px !important;
              color: #1e293b !important;
            }
            
            .bpw-composer {
              border-top: 1px solid #e2e8f0 !important;
              background: white !important;
            }
            
            .bpw-composer-inner {
              border-radius: 25px !important;
              border: 1px solid #d1d5db !important;
            }
            
            .bpw-composer-inner:focus-within {
              border-color: #2563eb !important;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
            }
            
            .bpw-send-button {
              background: #2563eb !important;
              border-radius: 50% !important;
            }
            
            .bpw-send-button:hover {
              background: #1d4ed8 !important;
            }
            
            /* Floating button customization */
            .bpw-floating-button {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
              border-radius: 50% !important;
              width: 60px !important;
              height: 60px !important;
            }
            
            .bpw-floating-button:hover {
              transform: scale(1.05) !important;
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
            }
            
            /* Animation for floating button */
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            
            .bpw-floating-button {
              animation: pulse 2s infinite !important;
            }
            
            /* Custom scrollbar */
            .bpw-msg-list::-webkit-scrollbar {
              width: 6px !important;
            }
            
            .bpw-msg-list::-webkit-scrollbar-track {
              background: #f1f5f9 !important;
            }
            
            .bpw-msg-list::-webkit-scrollbar-thumb {
              background: #cbd5e1 !important;
              border-radius: 3px !important;
            }
            
            .bpw-msg-list::-webkit-scrollbar-thumb:hover {
              background: #94a3b8 !important;
            }
          `,

          // Custom welcome message
          welcomeMessage:
            "👋 Hi! I'm here to help you find the right government schemes and services. How can I assist you today?",

          // Additional configuration
          botConversationDescription:
            "Chat with our AI assistant to discover government schemes",
          showBotInfoPage: true,

          // Event handlers
          onEvent: (event, data) => {
            console.log("Botpress event:", event, data);
            if (event === "webchat:ready") {
              setIsLoaded(true);
              setError(null);
            }
          },
        });

        console.log("Botpress initialized successfully");
      }
    } catch (error) {
      console.error("Error initializing Botpress:", error);
      setError("Failed to initialize chat widget");
      setIsLoaded(false);
    }
  };

  if (!isClient) {
    return null;
  }

  if (error) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 16px",
          background: "#fee2e2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          color: "#dc2626",
          fontSize: "14px",
          maxWidth: "300px",
          zIndex: 1000,
        }}
      >
        ⚠️ {error}
      </div>
    );
  }

  return (
    <>
      <div id="botpress-widget" />

      {/* Loading indicator */}
      {!isLoaded && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px",
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: "8px",
            color: "#0369a1",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid #0369a1",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading chat assistant...
        </div>
      )}

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default CustomBotpressChat;

// src/components/VoiceChatAssistant.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VoiceChatAssistant({ language = "en" }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === "ml" ? "ml-IN" : "en-IN";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript, true); // true = auto-speak response
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [language]);

  // Voice Output (TTS)
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); // stop current audio

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "ml" ? "ml-IN" : "en-IN";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async (queryText = input, autoSpeak = false) => {
    if (!queryText.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, language }),
      });
      const data = await res.json();
      setResponse(data.text);

      if (autoSpeak && data.text) {
        speakText(data.text);
      }
    } catch (err) {
      console.error(err);
      setResponse("Sorry, something went wrong while retrieving data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-xl shadow-md bg-card space-y-4">
      <div className="min-h-24 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
        {loading
          ? "Thinking and searching schemes..."
          : response || "Ask any question about government schemes..."}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          placeholder={isListening ? "Listening..." : "Type your query here..."}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input, false)}
          disabled={loading}
        />

        <Button
          type="button"
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          onClick={toggleMic}
          title={isListening ? "Stop listening" : "Start speaking"}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>

        {isSpeaking ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={stopSpeaking}
          >
            <VolumeX className="h-4 w-4 text-red-500" />
          </Button>
        ) : (
          response && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => speakText(response)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )
        )}

        <Button
          onClick={() => handleSend(input, false)}
          disabled={loading || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

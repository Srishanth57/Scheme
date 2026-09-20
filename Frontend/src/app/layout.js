import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import ElevenLabsWidget from "@/components/ElevenLabsWinget"; // or dynamic import
import "./globals.css";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          {process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID && (
            <ElevenLabsWidget
              agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
            />
          )}
        </Providers>
      </body>
    </html>
  );
}

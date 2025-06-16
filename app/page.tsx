import { VibetunnelScene } from "@/components/vibetunnel-scene"
import { Button } from "@/components/ui/button"
import { Download, Zap, ShieldCheck, Rocket } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"
import AudioPlayer from "@/components/audio-player"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vibetunnel: Your Mac Terminal in Any Browser | Secure & Retro",
  description:
    "Experience Vibetunnel – the macOS app that securely proxies your terminal to any browser. Enjoy real-time output, command execution, and a unique 80s retro ASCII interface.",
  openGraph: {
    title: "Vibetunnel: Your Mac Terminal in Any Browser | Secure & Retro",
    description:
      "Experience Vibetunnel – the macOS app that securely proxies your terminal to any browser. Enjoy real-time output, command execution, and a unique 80s retro ASCII interface.",
    url: "https://vibetunnel.sh",
    siteName: "Vibetunnel",
    images: [
      {
        url: "https://vibetunnel.sh/vibetunnel-icon.png",
        width: 512,
        height: 512,
        alt: "Vibetunnel Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibetunnel: Your Mac Terminal in Any Browser | Secure & Retro",
    description:
      "Experience Vibetunnel – the macOS app that securely proxies your terminal to any browser. Enjoy real-time output, command execution, and a unique 80s retro ASCII interface.",
    images: ["https://vibetunnel.sh/vibetunnel-icon.png"],
  },
}

export default function Home() {
  return (
    <div className="bg-[#0D1117] text-[#C9D1D9] font-mono min-h-screen antialiased">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="flex items-center justify-center md:justify-start gap-4 mb-8">
          <Image
            src="/app-icon.png"
            alt="Vibetunnel Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white"><span className="mobile-text-half">vibetunnel</span></h1>
        </header>

        <main>
          <div className="max-w-4xl mx-auto border border-gray-700 rounded-lg shadow-2xl shadow-purple-500/10 overflow-hidden bg-black">
            <div className="flex items-center px-4 py-2 bg-[#161B22] border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-grow text-center text-sm text-gray-400"><span className="mobile-text-half">vibetunnel</span> ~ zsh</div>
            </div>
            <div className="w-full h-[400px] md:h-[500px] bg-black">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-gray-500">Loading 3D Scene...</div>
                }
              >
                <VibetunnelScene />
              </Suspense>
            </div>
          </div>

          <section className="max-w-4xl mx-auto mt-12 md:mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Turn any browser into your Mac’s terminal.</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              <span className="mobile-text-half">VibeTunnel</span> proxies your terminals right into the browser, so you can vibe-code anywhere. Watch output
              scroll in real-time, type new commands, and spawn fresh sessions on the fly.
            </p>
            <Button className="mt-8 bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold text-lg px-8 py-6 rounded-md transition-transform hover:scale-105">
              <Download className="mr-2 h-5 w-5" />
              Download for Mac
            </Button>
            <p className="text-sm text-gray-500 mt-2">macOS 14.0 or later</p>
          </section>

          <section className="max-w-5xl mx-auto mt-16 md:mt-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white">Key Features</h3>
              <p className="text-gray-500 mt-2">[~-~-~-~-~-~-~-~]</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="border border-gray-800 p-6 rounded-lg bg-[#161B22] hover:border-purple-500 transition-colors">
                <div className="flex justify-center mb-4">
                  <Zap className="h-10 w-10 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">Blazing Fast</h4>
                <p className="mt-2 text-gray-400">Optimized for low-latency and high-throughput connections.</p>
              </div>
              <div className="border border-gray-800 p-6 rounded-lg bg-[#161B22] hover:border-purple-500 transition-colors">
                <div className="flex justify-center mb-4">
                  <ShieldCheck className="h-10 w-10 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-white">Ironclad Security</h4>
                <p className="mt-2 text-gray-400">End-to-end encryption using the latest cryptographic standards.</p>
              </div>
              <div className="border border-gray-800 p-6 rounded-lg bg-[#161B22] hover:border-purple-500 transition-colors">
                <div className="flex justify-center mb-4">
                  <Rocket className="h-10 w-10 text-pink-500" />
                </div>
                <h4 className="text-xl font-semibold text-white">Radical Interface</h4>
                <p className="mt-2 text-gray-400">A unique, fully-themed terminal UI that's both powerful and fun.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center mt-16 md:mt-24 py-8 border-t border-gray-800">
          <p className="text-gray-400 mb-2">
            Brought to you by{" "}
            <a href="https://mariozechner.at/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
              @badlogic
            </a>,{" "}
            <a href="https://lucumr.pocoo.org/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
              @mitsuhiko
            </a>{" "}
            and{" "}
            <a href="https://steipete.me" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
              @steipete
            </a>
          </p>
          <p className="text-gray-500">MIT Licensed · <a href="https://github.com/amantus-ai/vibetunnel" className="text-gray-400 hover:text-white transition-colors">Fork us on GitHub</a></p>
        </footer>
      </div>
      <AudioPlayer src="https://steipete.me/game-audio.mp3" />
    </div>
  )
}

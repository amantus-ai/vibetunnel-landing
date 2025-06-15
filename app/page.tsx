import AsciiTunnel from "@/components/ascii-tunnel"
import { Button } from "@/components/ui/button" // Using shadcn button, will style with ascii-button class

const StaticAsciiLogo = () => {
  const logo = `
      *
  *   |   *
   \\  |  /
*- - -O- - -*
   /  |  \\
  *   |   *
      *
`
  return <pre className="text-center text-green-400 text-sm md:text-base">{logo}</pre>
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center p-4 md:p-8 selection:bg-green-700 selection:text-black">
      <header className="w-full max-w-4xl text-center mb-8 md:mb-12">
        <StaticAsciiLogo />
        <h1 className="text-4xl md:text-6xl font-bold mt-4">vibetunnel</h1>
        <p className="text-lg md:text-xl text-green-300 mt-2">Your Portal to Focused Productivity on Mac.</p>
      </header>

      <section
        id="animation-viewport"
        className="w-full max-w-4xl mb-12 md:mb-20 p-2 md:p-4 border-2 border-green-600 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
      >
        <AsciiTunnel />
      </section>

      <main className="w-full max-w-3xl space-y-16 md:space-y-24">
        <section id="description" className="text-center">
          <h2 className="text-2xl md:text-3xl mb-4 text-green-500">--- What is VibeTunnel? ---</h2>
          <p className="text-base md:text-lg leading-relaxed">
            VibeTunnel is a unique Mac application designed to immerse you in a distraction-free, terminal-inspired
            environment. It channels your workflow into a streamlined experience, boosting focus and creativity.
            Experience your digital world like never before.
          </p>
        </section>

        <section id="features">
          <h2 className="text-2xl md:text-3xl text-center mb-8 text-green-500">--- Key Features ---</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="ascii-border p-4 md:p-6">
              <h3 className="text-xl md:text-2xl mb-3 text-green-300">Retro-Futuristic UI</h3>
              <p className="mb-1">&gt; Fully ASCII-rendered interface.</p>
              <p className="mb-1">&gt; Customizable terminal themes.</p>
              <p>&gt; Smooth animations and transitions.</p>
            </div>
            <div className="ascii-border p-4 md:p-6">
              <h3 className="text-xl md:text-2xl mb-3 text-green-300">Deep Focus Mode</h3>
              <p className="mb-1">&gt; Minimize distractions effectively.</p>
              <p className="mb-1">&gt; Streamlined task management.</p>
              <p>&gt; Keyboard-centric navigation.</p>
            </div>
            <div className="ascii-border p-4 md:p-6">
              <h3 className="text-xl md:text-2xl mb-3 text-green-300">Mac Optimized</h3>
              <p className="mb-1">&gt; Native macOS performance.</p>
              <p className="mb-1">&gt; Lightweight and resource-friendly.</p>
              <p>&gt; Seamless integration with your workflow.</p>
            </div>
            <div className="ascii-border p-4 md:p-6">
              <h3 className="text-xl md:text-2xl mb-3 text-green-300">Pure Vibe</h3>
              <p className="mb-1">&gt; Unique visual and auditory experience.</p>
              <p className="mb-1">&gt; Enter the tunnel, find your flow.</p>
              <p>&gt; For coders, writers, and creators.</p>
            </div>
          </div>
        </section>

        <section id="cta" className="text-center">
          <h2 className="text-2xl md:text-3xl mb-6 text-green-500">--- Enter the VibeTunnel ---</h2>
          <Button className="ascii-button text-lg md:text-xl">Download Alpha</Button>
          <p className="mt-6 text-sm">
            <a href="#" className="hover:underline text-green-300">
              Learn More &gt;_
            </a>
          </p>
        </section>
      </main>

      <footer className="w-full max-w-3xl text-center mt-16 md:mt-24 pt-8 border-t border-green-700">
        <p className="text-sm text-green-500">&copy; {new Date().getFullYear()} VibeTunnel. All rights reserved.</p>
        <p className="text-xs text-green-600 mt-1">Crafted with ASCII and &lt;3</p>
      </footer>
    </div>
  )
}

import { Heart, Terminal } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You! - VibeTunnel',
  description: 'Thank you for supporting VibeTunnel development',
}

export default function ThankYouPage() {
  return (
    <div className="bg-[#0D1117] text-[#C9D1D9] font-mono min-h-screen antialiased flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Terminal className="h-24 w-24 text-green-400" />
              <Heart className="h-8 w-8 text-purple-400 absolute -bottom-2 -right-2" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Thank You! 💚
          </h1>
          
          <div className="border border-gray-700 rounded-lg bg-[#161B22] p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">
              Your support means everything to us!
            </p>
            <p className="text-gray-400">
              With your help, we can keep improving VibeTunnel and make terminal access 
              even more awesome. You're now part of the VibeTunnel family!
            </p>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-300 mb-6">
              From the VibeTunnel team:
            </p>
            
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative border-2 border-purple-500 rounded-lg overflow-hidden">
                  <Image
                    src="https://steipete.me/assets/img/2025/vibetunnel/team.jpg"
                    alt="VibeTunnel Team"
                    width={400}
                    height={300}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-purple-400">
              <a
                href="https://mariozechner.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                Mario Zechner
              </a>
              <span className="hidden sm:inline text-gray-600">•</span>
              <a
                href="https://lucumr.pocoo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                Armin Ronacher
              </a>
              <span className="hidden sm:inline text-gray-600">•</span>
              <a
                href="https://steipete.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                Peter Steinberger
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-[#00cc00] hover:bg-[#00aa00] text-white font-bold px-6 py-3 rounded-md transition-transform hover:scale-105"
              asChild
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-md transition-transform hover:scale-105 border border-gray-600"
              asChild
            >
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20supported%20%40vibetunnel%20-%20Turn%20any%20browser%20into%20your%20Mac%27s%20terminal!%20%F0%9F%92%9A%E2%9C%A8&url=https://vibetunnel.sh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on Twitter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PolarDonation() {
  return (
    <div className="mt-16 md:mt-24 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Support VibeTunnel</h3>
        <p className="text-gray-400">Help us keep the terminal vibes flowing</p>
      </div>
      <div className="border border-gray-800 rounded-lg bg-[#161B22] p-8 hover:border-purple-500 transition-colors">
        <div className="flex flex-col items-center space-y-6">
          <Heart className="h-12 w-12 text-purple-400" />
          <p className="text-gray-300 text-center">
            If you love VibeTunnel and want to support its development, consider buying us a coffee!
          </p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-md transition-transform hover:scale-105 w-full sm:w-auto"
            asChild
          >
            <a
              href="https://polar.sh/vibetunnel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="mr-2 h-5 w-5" />
              Support on Polar
            </a>
          </Button>
          <p className="text-sm text-gray-500">
            One-time or recurring donations
          </p>
        </div>
      </div>
    </div>
  )
}
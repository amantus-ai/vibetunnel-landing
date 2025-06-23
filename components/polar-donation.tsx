'use client'

import { Heart } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Script from 'next/script'

export function PolarDonation() {
  // Checkout link from Polar dashboard
  const checkoutLink = `https://buy.polar.sh/polar_cl_bymSeiaNkztw9bRHCqHZe7nUxKNbO8XbJIxBX1ZBUi7`
  
  useEffect(() => {
    // Initialize Polar embed after script loads
    if (typeof window !== 'undefined' && (window as any).PolarEmbedCheckout) {
      (window as any).PolarEmbedCheckout.init()
    }
  }, [])
  
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).PolarEmbedCheckout) {
            (window as any).PolarEmbedCheckout.init()
          }
        }}
      />
      
      <div className="mt-16 md:mt-24 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Support VibeTunnel</h3>
          <p className="text-gray-400">Help us keep the terminal vibes flowing</p>
        </div>
        <div className="border border-gray-800 rounded-lg bg-[#161B22] p-8 hover:border-purple-500 transition-colors">
          <div className="flex flex-col items-center space-y-6">
            <Heart className="h-12 w-12 text-purple-400" />
            <p className="text-gray-300 text-center max-w-md">
              Support the team so we can buy pizza and drinks while we keep hacking on your favorite AI agent orchestration platform.
            </p>
            
            <a
              href={checkoutLink}
              data-polar-checkout
              data-polar-checkout-theme="dark"
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6 rounded-md transition-transform hover:scale-105 min-w-[280px]">
                <Heart className="mr-2 h-5 w-5" />
                Support on Polar
              </Button>
            </a>
            
            <p className="text-sm text-gray-500">
              Pay what you want - one-time or monthly
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
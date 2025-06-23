'use client'

import { Heart, Coffee, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function PolarDonation() {
  const productId = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || "3ef4b0ac-fbb5-47b6-ad0e-f2dd0bc46957"
  const checkoutUrl = `/api/polar/checkout?products=${productId}`
  
  return (
    <div className="mt-16 md:mt-24 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Support VibeTunnel</h3>
        <p className="text-gray-400">Help us keep the terminal vibes flowing</p>
      </div>
      <div className="border border-gray-800 rounded-lg bg-[#161B22] p-8 hover:border-purple-500 transition-colors">
        <div className="flex flex-col items-center space-y-6">
          <Heart className="h-12 w-12 text-purple-400" />
          <p className="text-gray-300 text-center max-w-md">
            Turn any browser into your terminal & command your agents on the go.
            Support the team so we can buy pizza and drinks while we keep hacking on your favorite AI agent orchestration platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link 
              href={checkoutUrl}
              className="flex-1"
            >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-6 py-6 rounded-md transition-transform hover:scale-105 w-full">
                <Coffee className="mr-2 h-5 w-5" />
                One-time Support
              </Button>
            </Link>
            
            <Link 
              href={checkoutUrl}
              className="flex-1"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-6 py-6 rounded-md transition-transform hover:scale-105 w-full">
                <Calendar className="mr-2 h-5 w-5" />
                Monthly Support
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Choose your preferred way to support VibeTunnel
          </p>
        </div>
      </div>
    </div>
  )
}
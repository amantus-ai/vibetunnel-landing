'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'

export function PolarDonation() {
  const productId = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || ""
  const checkoutUrl = `/api/polar/checkout?products=${productId}`
  
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
          <Link
            href={checkoutUrl}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-md transition-transform hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center"
          >
            <Heart className="mr-2 h-5 w-5" />
            Support on Polar
          </Link>
          <p className="text-sm text-gray-500">
            One-time or recurring donations
          </p>
        </div>
      </div>
    </div>
  )
}
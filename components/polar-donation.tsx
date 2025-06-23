'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function PolarDonation() {
  // Checkout link from Polar dashboard
  const checkoutLink = `https://buy.polar.sh/polar_cl_bymSeiaNkztw9bRHCqHZe7nUxKNbO8XbJIxBX1ZBUi7`
  
  return (
    <div id="support" className="mt-16 md:mt-24 max-w-xl mx-auto scroll-mt-20">
      <Card className="bg-[#161B22] border-gray-800 hover:border-purple-500 transition-colors">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Heart className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-white">Support VibeTunnel</CardTitle>
          <CardDescription className="text-gray-400">
            Help us keep the terminal vibes flowing
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-gray-300 mb-6">
            Support the team so we can buy pizza and drinks while we keep hacking on your favorite AI agent orchestration platform.
          </p>
          
          <Link href={checkoutLink}>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6 rounded-md transition-transform hover:scale-105 min-w-[280px]">
              <Heart className="mr-2 h-5 w-5" />
              Support us on Polar
            </Button>
          </Link>
        </CardContent>
        
        <CardFooter className="text-center justify-center">
          <p className="text-sm text-gray-500">
            Pay what you want - one-time or monthly
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
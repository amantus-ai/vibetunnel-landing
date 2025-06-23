'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed'

export function PolarDonation() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Checkout link from Polar dashboard
  const checkoutLink = `https://buy.polar.sh/polar_cl_bymSeiaNkztw9bRHCqHZe7nUxKNbO8XbJIxBX1ZBUi7`
  
  const openCheckout = async () => {
    setIsLoading(true)
    
    try {
      // Create the checkout iframe with dark theme
      const checkout = await PolarEmbedCheckout.create(checkoutLink, 'dark')
      
      // Listen for successful purchase
      checkout.addEventListener('success', (event) => {
        console.log('Purchase successful!', event.detail)
        // Optionally redirect to thank you page
        window.location.href = '/thank-you'
      })
      
      // Listen for checkout close
      checkout.addEventListener('close', () => {
        console.log('Checkout closed')
        setIsLoading(false)
      })
      
    } catch (error) {
      console.error('Failed to open checkout', error)
      setIsLoading(false)
    }
  }
  
  return (
    <div className="mt-16 md:mt-24 max-w-xl mx-auto">
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
          
          <Button 
            onClick={openCheckout}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6 rounded-md transition-transform hover:scale-105 min-w-[280px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="mr-2 h-5 w-5" />
            {isLoading ? 'Opening...' : 'Support on Polar'}
          </Button>
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
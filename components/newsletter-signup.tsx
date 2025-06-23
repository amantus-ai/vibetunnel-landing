'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email to confirm.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div id="newsletter" className="mt-16 md:mt-24 max-w-xl mx-auto scroll-mt-20">
      <Card className="bg-[#161B22] border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Mail className="h-12 w-12 text-green-400" />
          </div>
          <CardTitle className="text-2xl text-white">Terminal vibes delivered</CardTitle>
          <CardDescription className="text-gray-400">
            Get updates on new features and terminal tips
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-green-400 transition-colors"
              required
            />
            
            <Button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="mr-2 h-4 w-4" />
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          {message && (
            <p className={`mt-4 text-sm text-center ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
          
          <p className="text-xs text-gray-500 text-center mt-4">
            No spam, unsubscribe anytime
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
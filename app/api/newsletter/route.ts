import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.BUTTONDOWN_API_KEY) {
      console.error('BUTTONDOWN_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }
    
    // Log API key info for debugging (without exposing the key)
    console.log('API key length:', process.env.BUTTONDOWN_API_KEY.length)
    console.log('API key starts with:', process.env.BUTTONDOWN_API_KEY.substring(0, 10) + '...')

    // Subscribe to Buttondown
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        referrer_url: request.headers.get('referer') || 'https://vibetunnel.sh',
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = await response.text()
      }
      console.error('Buttondown error:', response.status, errorData)
      
      // Handle common errors
      if (response.status === 409) {
        return NextResponse.json(
          { error: 'This email is already subscribed!' },
          { status: 409 }
        )
      }
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Newsletter service configuration error' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge' // Use edge runtime for better performance

export async function POST(request: NextRequest) {
  try {
    // Clone the request to avoid body already read issues
    const clonedRequest = request.clone()
    
    let body;
    try {
      body = await clonedRequest.json()
    } catch (e) {
      console.error('Failed to parse request body:', e)
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }
    
    const { email } = body
    
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
    console.log('Attempting to subscribe email:', email)
    
    let response;
    try {
      response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,  // Buttondown expects email_address, not email
          tags: ['landing'],
          metadata: {
            source: 'vibetunnel-landing'
          }
        }),
      })
    } catch (fetchError) {
      console.error('Failed to reach Buttondown API:', fetchError)
      return NextResponse.json(
        { error: 'Failed to connect to newsletter service' },
        { status: 500 }
      )
    }

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
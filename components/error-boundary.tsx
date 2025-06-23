'use client'

import React from 'react'
import { Terminal } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full text-gray-500 bg-black rounded-lg p-8">
            <div className="text-center">
              <Terminal className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p className="text-sm">3D Terminal Scene</p>
              <p className="text-xs mt-2 text-gray-600">Unable to render</p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
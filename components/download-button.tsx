'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    twq: (action: string, eventId: string, options?: any) => void
  }
}

export function DownloadButton() {
  const handleDownloadClick = () => {
    // Fire Twitter conversion event
    if (typeof window !== 'undefined' && window.twq) {
      window.twq('event', 'tw-q595k-q595n', {})
    }
  }

  return (
    <Button
      className="bg-[#00cc00] hover:bg-[#00aa00] text-white font-bold text-lg px-8 py-6 rounded-md transition-transform hover:scale-105 w-full sm:w-64"
      asChild
    >
      <a
        href="https://stats.store/download/vibetunnel"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDownloadClick}
      >
        <Download className="mr-2 h-5 w-5" />
        Download for Mac
      </a>
    </Button>
  )
}
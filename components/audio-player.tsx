"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("keydown", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }
  }, [])

  useEffect(() => {
    if (hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.warn("Audio autoplay was prevented:", error)
          // Fallback for browsers that still block even after interaction
          setIsPlaying(false)
        })
    }
  }, [hasInteracted])

  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => console.warn("Error playing audio:", error))
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(audioRef.current.muted)
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[#161B22] p-3 rounded-lg shadow-lg border border-gray-700 flex items-center space-x-3 z-50">
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={togglePlayPause}
        className="text-green-400 hover:text-green-300 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={toggleMute}
        className="text-green-400 hover:text-green-300 transition-colors"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <div className="text-xs text-gray-400 hidden sm:block">
        <span>80s Vibes</span>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)

  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return

    const logError = (event: Event) => {
      const error = (event.target as HTMLAudioElement).error
      let errorMessage = "Unknown audio error"
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Audio playback aborted."
            break
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "A network error caused audio download to fail."
            break
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Audio playback aborted due to a decoding error."
            break
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio source not supported."
            break
          default:
            errorMessage = `An unknown error occurred (code: ${error.code})`
        }
      }
      console.error("Audio Error:", errorMessage, event)
      setAudioError(errorMessage)
    }

    audioElement.addEventListener("error", logError)

    // Attempt to play on mount if interaction has already happened (e.g. page navigation)
    if (hasInteracted && !isPlaying && audioElement.paused) {
      // Check if paused
      audioElement
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay on mount/interaction failed:", err)
        })
    }

    return () => {
      audioElement.removeEventListener("error", logError)
    }
  }, [src, hasInteracted, isPlaying]) // isPlaying dependency ensures this effect can re-evaluate if play state changes externally

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        // Try to play immediately after first interaction
        if (audioRef.current && !isPlaying && audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
              setAudioError(null)
            })
            .catch((error) => {
              console.warn("Audio autoplay after interaction failed:", error)
              setIsPlaying(false)
            })
        }
      }
      // Clean up listeners after first interaction
      window.removeEventListener("click", handleInteraction, { capture: true })
      window.removeEventListener("keydown", handleInteraction, { capture: true })
      window.removeEventListener("touchstart", handleInteraction, { capture: true })
    }

    // Add listeners with capture to ensure they fire early
    // Only add these listeners if we haven't interacted yet
    if (!hasInteracted) {
      window.addEventListener("click", handleInteraction, { capture: true })
      window.addEventListener("keydown", handleInteraction, { capture: true })
      window.addEventListener("touchstart", handleInteraction, { capture: true })
    }

    return () => {
      window.removeEventListener("click", handleInteraction, { capture: true })
      window.removeEventListener("keydown", handleInteraction, { capture: true })
      window.removeEventListener("touchstart", handleInteraction, { capture: true })
    }
  }, [hasInteracted, isPlaying]) // isPlaying dependency ensures this effect can re-evaluate

  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (!hasInteracted) setHasInteracted(true)

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setAudioError(null)
        })
        .catch((error) => {
          console.warn("Error playing audio:", error)
          setAudioError("Playback failed.")
          setIsPlaying(false)
        })
    }
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
        {audioError ? <span className="text-red-400">{audioError}</span> : <span>80s Vibes</span>}
      </div>
    </div>
  )
}

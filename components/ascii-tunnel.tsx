"use client"

import type React from "react"
import { useState, useEffect } from "react"

const TUNNEL_WIDTH = 80
const TUNNEL_HEIGHT = 26 // Increased height for better tunnel effect
const ANIMATION_SPEED_MS = 100 // 10 FPS

const generateFrame = (step: number): string => {
  const lines: string[][] = Array(TUNNEL_HEIGHT)
    .fill(null)
    .map(() => Array(TUNNEL_WIDTH).fill(" "))

  const centerX = Math.floor(TUNNEL_WIDTH / 2)
  const centerY = Math.floor(TUNNEL_HEIGHT / 2)

  // Tunnel layers
  const numLayers = 6 // Increased layers for more depth
  const layerChars = ["#", "*", "=", "-", ".", ":"]

  for (let i = 0; i < numLayers; i++) {
    const progress = ((step + i * 5) % 50) / 50 // Staggered animation for layers
    const layerWidth = Math.floor(progress * centerX * 1.2) // Make layers wider
    const layerHeight = Math.floor(progress * centerY * 1.2) // Make layers taller
    const char = layerChars[i % layerChars.length]

    if (layerWidth < 1 || layerHeight < 1) continue

    for (let y = centerY - layerHeight; y <= centerY + layerHeight; y++) {
      for (let x = centerX - layerWidth; x <= centerX + layerWidth; x++) {
        if (y < 0 || y >= TUNNEL_HEIGHT || x < 0 || x >= TUNNEL_WIDTH) continue
        if (
          y === centerY - layerHeight ||
          y === centerY + layerHeight ||
          x === centerX - layerWidth ||
          x === centerX - layerWidth + 1 || // Thicker lines for sides
          x === centerX + layerWidth ||
          x === centerX + layerWidth - 1
        ) {
          if (lines[y][x] === " ") lines[y][x] = char
        }
      }
    }
  }

  // Animated text "vibetunnel"
  const logoText = "vibetunnel"
  const logoCycleDuration = 100 // Steps for one full zoom cycle
  const currentLogoStep = step % logoCycleDuration

  let displayLogoText = logoText
  const textScaleFactor = currentLogoStep / logoCycleDuration // 0 to 1

  // Scale effect: change spacing and case
  if (textScaleFactor > 0.8) {
    displayLogoText = logoText.toUpperCase().split("").join("   ")
  } else if (textScaleFactor > 0.6) {
    displayLogoText = logoText.toUpperCase().split("").join("  ")
  } else if (textScaleFactor > 0.4) {
    displayLogoText = logoText.toUpperCase().split("").join(" ")
  } else if (textScaleFactor > 0.2) {
    displayLogoText = logoText.split("").join(" ")
  }
  // else normal text

  const logoX = Math.floor(centerX - displayLogoText.length / 2)
  const logoY = centerY

  for (let k = 0; k < displayLogoText.length; k++) {
    if (logoY >= 0 && logoY < TUNNEL_HEIGHT && logoX + k >= 0 && logoX + k < TUNNEL_WIDTH) {
      lines[logoY][logoX + k] = displayLogoText[k]
    }
  }

  return lines.map((line) => line.join("")).join("\n")
}

const AsciiTunnel: React.FC = () => {
  const [frameCount, setFrameCount] = useState(0)
  const [tunnelArt, setTunnelArt] = useState("")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameCount((prevCount) => prevCount + 1)
    }, ANIMATION_SPEED_MS)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    setTunnelArt(generateFrame(frameCount))
  }, [frameCount])

  return (
    <pre className="w-full overflow-x-auto text-xs md:text-sm leading-tight md:leading-snug text-center select-none whitespace-pre">
      {tunnelArt}
    </pre>
  )
}

export default AsciiTunnel

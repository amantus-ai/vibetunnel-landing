#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MP3_PATH = path.join(__dirname, '..', 'public', 'audio', 'game-audio.mp3');
const BASE64_PATH = path.join(__dirname, '..', '.mp3-backup.txt');

if (fs.existsSync(MP3_PATH)) {
  const mp3Buffer = fs.readFileSync(MP3_PATH);
  const base64 = mp3Buffer.toString('base64');
  fs.writeFileSync(BASE64_PATH, base64);
  console.log('✅ MP3 converted to base64 and saved to .mp3-backup.txt');
} else {
  console.error('❌ MP3 file not found');
}
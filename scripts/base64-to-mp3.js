#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MP3_PATH = path.join(__dirname, '..', 'public', 'audio', 'game-audio.mp3');
const BASE64_PATH = path.join(__dirname, '..', '.mp3-backup.txt');

if (fs.existsSync(BASE64_PATH)) {
  // Ensure audio directory exists
  const audioDir = path.dirname(MP3_PATH);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  
  const base64 = fs.readFileSync(BASE64_PATH, 'utf8');
  const mp3Buffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(MP3_PATH, mp3Buffer);
  console.log('✅ MP3 restored from base64 backup');
} else {
  console.error('❌ Base64 backup file not found');
}
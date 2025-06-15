#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MP3_PATH = path.join(__dirname, '..', 'public', 'audio', 'game-audio.mp3');
const BACKUP_PATH = path.join(__dirname, '..', 'audio-backup', 'game-audio.mp3');
const BASE64_PATH = path.join(__dirname, '..', '.mp3-backup.txt');

// Ensure backup directory exists
const backupDir = path.dirname(BACKUP_PATH);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Check if MP3 exists
if (fs.existsSync(MP3_PATH)) {
  // Create backup
  fs.copyFileSync(MP3_PATH, BACKUP_PATH);
  console.log('✅ MP3 file backed up successfully');
} else {
  // Try to restore from file backup first
  if (fs.existsSync(BACKUP_PATH)) {
    // Ensure audio directory exists
    const audioDir = path.dirname(MP3_PATH);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    fs.copyFileSync(BACKUP_PATH, MP3_PATH);
    console.log('✅ MP3 file restored from backup');
  } 
  // Try base64 backup as fallback
  else if (fs.existsSync(BASE64_PATH)) {
    // Ensure audio directory exists
    const audioDir = path.dirname(MP3_PATH);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    const base64 = fs.readFileSync(BASE64_PATH, 'utf8');
    const mp3Buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(MP3_PATH, mp3Buffer);
    console.log('✅ MP3 file restored from base64 backup');
  } else {
    console.warn('⚠️  No MP3 file found and no backup available');
  }
}
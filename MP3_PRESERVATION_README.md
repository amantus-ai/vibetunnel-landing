# MP3 File Preservation Guide

## Problem
v0 from Vercel has a known issue where it deletes files in the `public` folder during sync operations, including our `game-audio.mp3` file.

## Solutions Implemented

### 1. Automatic Preservation Script
- **Location**: `scripts/preserve-assets.js`
- **Purpose**: Automatically backs up and restores the MP3 file
- **Runs on**:
  - `npm run build` (via prebuild hook)
  - `npm install` (via postinstall hook)
  - Manual: `npm run preserve-assets`

### 2. Multiple Backup Strategies

#### Local File Backup
- Copies MP3 to `audio-backup/game-audio.mp3`
- Ignored by git (in `.gitignore`)
- Primary restoration source

#### Base64 Backup (Optional)
- Convert MP3 to base64: `node scripts/mp3-to-base64.js`
- Creates `.mp3-backup.txt` (can be committed to git)
- Restore from base64: `node scripts/base64-to-mp3.js`

### 3. Vercel Ignore
- Created `.vercelignore` file
- Prevents Vercel from processing the MP3 during deployment

### 4. Git Protection
- MP3 is tracked in git
- Always commit after restoring

## Manual Recovery Steps

If the MP3 file is deleted:

1. **Quick restore**: `npm run preserve-assets`
2. **From git history**: `git checkout 7f5c3f6 -- public/audio/game-audio.mp3`
3. **From base64 backup**: `node scripts/base64-to-mp3.js`

## Prevention Tips

1. Always run `npm run preserve-assets` after v0 sync
2. Keep the MP3 committed in git
3. Consider storing assets outside the `public` folder if issues persist
4. Monitor the file after each v0 operation

## Alternative Solutions (if problems persist)

1. **CDN Hosting**: Upload MP3 to a CDN and reference the URL
2. **Build-time Copy**: Copy from a source directory during build
3. **Environment-based Loading**: Use different asset strategies for dev/prod
4. **Disable v0 Sync**: Work without v0's auto-sync feature
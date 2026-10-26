#!/bin/bash
# Full-page screenshots of real client websites for video-style previews
# Usage: bash shoot-sites.sh <url> <outname>
URL="$1"
OUT="$2"
agent-browser --session shoot open "$URL" --timeout 60000 2>&1 | tail -1
agent-browser --session shoot wait --load networkidle --timeout 30000 2>&1 | tail -1
agent-browser --session shoot wait 5000
# trigger lazy loading: step-scroll to bottom
agent-browser --session shoot eval "
(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < Math.min(h, 12000); y += 800) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 180));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 800));
  // strip cookie/consent overlays + chat widgets for clean capture
  document.querySelectorAll('[id*=\"cookie\" i],[class*=\"cookie\" i],[id*=\"consent\" i],[class*=\"consent\" i],[id*=\"onetrust\" i],[class*=\"onetrust\" i],[id*=\"CybotCookiebotDialog\"],[class*=\"gdpr\" i],[class*=\"whatsapp\" i],[class*=\"wa-widget\" i],[class*=\"chat-widget\" i],[id*=\"chat\" i]').forEach(e => e.remove());
  return document.body.scrollHeight;
})()
" 2>&1 | tail -1
agent-browser --session shoot wait 2500
agent-browser --session shoot screenshot "$OUT" --full 2>&1 | tail -1
echo "DONE $OUT"

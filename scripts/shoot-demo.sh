#!/bin/bash
# Screenshot demo sites served by the Next.js dev server
NAME="$1"
agent-browser --session demo open "http://localhost:3000/demo-sites/$NAME.html" --timeout 30000 2>&1 | tail -1
agent-browser --session demo wait 3500
agent-browser --session demo eval "
(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500));
  return document.body.scrollHeight;
})()" 2>&1 | tail -1
agent-browser --session demo screenshot "/home/z/my-project/scripts/shots/$NAME.png" --full 2>&1 | tail -1
agent-browser --session demo close 2>/dev/null
echo "DONE $NAME"

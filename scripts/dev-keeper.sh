#!/bin/bash
# Keeps the Next.js dev server alive — restarts instantly if it dies.
cd /home/z/my-project
while true; do
  echo "[keeper] starting dev $(date +%T)" >> dev-keeper.log
  bun run dev >> dev-keeper.log 2>&1
  CODE=$?
  echo "[keeper] dev exited code=$CODE $(date +%T)" >> dev-keeper.log
  sleep 2
done

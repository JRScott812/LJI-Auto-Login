#!/bin/bash

echo "Checking for Wifi..."
attempt=0
max_attempts=30
while ! ping -c 1 -W 1 google.com; do
    ((attempt++))
    if [ "$attempt" -ge "$max_attempts" ]; then
        echo "No connection after $max_attempts attempts; exiting." >&2
        exit 1
    fi
    echo "No connection (attempt $attempt of $max_attempts)..."
    sleep 5
done
echo "Connected to the Internet!"
chromium-browser --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-screensaver --start-fullscreen https://test.searchlight.ljiapps.com
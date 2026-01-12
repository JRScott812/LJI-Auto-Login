#!/bin/bash

echo "Checking for Wifi..."
attempt=0
while ! ping -c 1 -W 1 google.com; do
    ((attempt++))
    echo "No connection (attempt $attempt)..."
    sleep 5
done
echo "Connected to the Internet!"
chromium-browser --load-extension="$HOME/.local/share/lji-auto-login-extension" --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-screensaver --start-fullscreen https://searchlight.ljiapps.com
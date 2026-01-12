#!/bin/bash

echo "Checking for Wifi..."
while ! ping -c 1 -W 1 google.com; do
    sleep 5
done
echo"Connected to the Internet!"
chromium-browser --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-screensaver --start-fullscreen --password-store=basic https://searchlight.ljiapps.com
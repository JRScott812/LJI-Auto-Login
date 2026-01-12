echo "Setting up autostart scripts..."
echo "Creating necessary directories..."
mkdir -p "$HOME/.config/labwc"
echo "Copying autostart scripts..."
grep -q "user_name" "Autostart Scripts/autostart" && { echo "Warning: autostart file contains 'user_name' - please edit it to use your actual username"; exit 1; }
cp "Autostart Scripts/autostart" "$HOME/.config/labwc/autostart" || { echo "Error: Failed to copy autostart script"; exit 1; }

echo "Copying run-chromium.sh script..."
cp "Autostart Scripts/run-chromium.sh" "$HOME/run-chromium.sh" || { echo "Error: Failed to copy run-chromium.sh"; exit 1; }
echo "Applying executable permissions to run-chromium.sh..."
chmod +x "$HOME/run-chromium.sh"

echo "Adding `LJI Auto Login` extension to Chromium..."
chromium-browser --load-extension="$(pwd)/LJI Auto Login" || { echo "Error: Failed to add extension to Chromium"; exit 1; }

echo "Setup complete!"
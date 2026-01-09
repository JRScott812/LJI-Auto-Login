# Raspberry Pi TV Setup

<b>*By Jake Scott & Luke Stone*</b> -- 1/9/2026

## Prerequisite Hardware

- Raspberry Pi
    - The exact model we used was the `Model 4 B`, but as long as it has display and WiFi capabilities, then it should be fine.

- MicroSD Card
    - Doesn't need to be too big, just big enough to hold the OS and some cookies.

- Power Cable
    - The `Model 4 B` uses `USB-C` but some other models use `Micro-USB`

- Display Cable
    - Most Raspberry Pis use a `Micro-HDMI`
        - If you already have a normal `HDMI` cable then you can get an adapter.
        - If not, then you can just get a `HDMI` to `Micro-HDMI` cable.

- TV/Monitor
    - It doesn't matter if it is a *"smart"* TV, all it needs is a display port for the Raspberry Pi to connect to.

## Raspberry Pi Setup Steps

1. Get an OS from [Raspberry Pi OS Downloads](https://www.RaspberryPi.com/software/operating-systems/) *(unless your Raspberry Pi did not already come with an OS preloaded on the MicroSD card)*.
    - We used `Raspbian GNU/Linx 12 Bookworm 32-bit`

2. Burn the downloaded OS to a `MicroSD` card *(if needed)*

3. Put it in the Raspberry Pi's `MicroSD` card slot.

4. Connect the Raspberry Pi to a power source
    - *Some TVs have USB ports on them to supply power to streaming devices like Chromecasts, Rokus, Fire Sticks, etc... .  If the TV has this, then use that to power the Raspberry Pi, so it turns on with the TV.*
    - If the TV doesn't have this, then just use another outlet and (un)plug the power cable to turn the Raspberry Pi on & off.

5. Connect the display cable to the Raspberry Pi and the TV
    - Make sure that the TV is set to auto-detect input, or set it to always go to `HDMI 1` *(or something like that by default)*.
    - *The TV might have a sleep timer set to turn off after a while if no remote buttons are pressed.  You might have to change this in the settings.*

6. Finish the OS setup process
    - **This will require a mouse and keyboard**
        - The `Model 4 B` has 2 USB 2.0 & 2 USB 3.0 ports
        - Other models might use Micro-USB and might need a splitter to use both mouse & keyboard *(even though the model might have 2 `Micro-USB` ports, 1 will be used for the power cable)*
    - Make sure to choose `Chromium` as the browser and **not** `Firefox`!

7. Setup the Internet connection:
    - If using WiFi:
        - Then you must have it attached to the display you want so you can see the menu for setup.
        - Connect it to thedesired network, by entering the password.
    - If the Raspberry Pi has an Ethernet port *(like the `Model 4 B`)*:
        - Insert the Ethernet cable into the Ethernet port and ensure that it has an Internet connection.

## Setting up the `Dashboard Site`

- Open `Chromium` and go to the [Love Justice International Dashboard](https://LoveJustice.ngo)

- If prompted for a "KeyRing" just leave the fields blank and continue
    - It will give you a security warning, but just continue again.

- Then login with the `Dashboard Display Account` *(It is a organization-wide account that can view **all** data, but edit **no** data)*:
    - When asked to save credentials, say `Yes`

- Download the custom [LJI Auto Login](https://github.com/JRScott812/LJI-Auto-Login/archive/refs/heads/main.zip) browser extension:
    - Extract the `*.zip` file
    - Go into the `Extensions` settings under [chrome://extensions/](chrome://extensions/)
    - Enable `Developer Mode`
    - Click `Load Unpacked`
    - Select the folder ou extracted to earlier
    - Click on the extension's icon
    - Enter the credentials for the `Display Account`
    - Click `Save`

- Now it should try to automatically login to Searchlight, if it was previously logged out.

- **Make sure to save the password**

- The login session should never expire

## Setting up the automatic startup scripts

*If creating files in the file viewer, you might have to go into the `View` settings and enable something like "See Hidden Files", to see files and folders whose names begin with `.`.*

1. Create the file `~/run-chromium.sh` with this content:
    ```bash
    #!/bin/bash

    echo "Checking for Wifi..."
    while ! ping -c 1 -W 1 google.com; do
        sleep 5
    done
    echo"Connected to the Internet!"
    chromium-browser --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-screensaver --start-fullscreen --password-store=basic https://searchlight.ljiapps.com
    ```
    - This `ping`s `google.com` every 5 seconds to check if the device is connected to WiFi.  When it can connect to WiFi it opens the dashboard page, with all of those flags to make it display fullscreen in one page and look nice.
    - Run this command: `chmod +x ~/run-chromium.sh` to make the script executable
        - This **must** be done to get the script to run properly on startup.

2. Create the file `~/.config/labwc/autostart` with this content:
    ```bash
    /home/user_name/run-chromium.sh
    ```
    - Do **not** use the `~` shortcut.  It will break the script since the environment's shortcuts will not have been loaded yet when the startup script is run.
    - **The `user_name` is a placeholder for the actual username that you create when initially setting up the OS.  Make sure to replace it!**

# Conclusion

**Setup is complete!**

You can now unplug the mouse & keyboard.  You should now be able to display the dashboard by simply turning on the Raspberry Pi and TV.  The startup script should open the dashboard once the computer boots to the desktop.

# Notes

If there is now WiFi, then it will infinitely ping `google.com`, so if the WiFi network is broken then just turn the TV and Raspberry Pi off and then back on once the network is fixed.  Or just leave it on, and it will reconnect eventually, if the network gets fixed.
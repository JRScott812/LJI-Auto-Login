# Raspberry Pi TV Setup

***By Jake Scott & Luke Stone***

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
    - We used `Raspbian GNU/Linux 12 Bookworm 32-bit`

2. Burn the downloaded OS to a `MicroSD` card *(if needed)*

3. Insert the `MicroSD` card into the Raspberry Pi's `MicroSD` card slot.

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
        - Connect it to the desired network, by entering the password.
    - If the Raspberry Pi has an Ethernet port *(like the `Model 4 B`)*:
        - Insert the Ethernet cable into the Ethernet port and ensure that it has an Internet connection.

8. Run [setup.sh](setup.sh) to create the autostarting functionality:
    - **Before you run the [setup.sh](setup.sh), go into [autostart](Autostart%20Scripts/autostart) and change `user_name` to whatever username you used to setup the OS in `Step 6`.**
        - [setup.sh](setup.sh) will give an error and stop running if it detects that [autostart](Autostart%20Scripts/autostart) still says: `/home/user_name/run-chromium.sh`.
    - [setup.sh](setup.sh) will do 2 things:
        1. Copy [autostart](Autostart%20Scripts/autostart) to `~/.config/labwc/autostart`
        2. Copy [run-chromium.sh](Autostart%20Scripts/run-chromium.sh) to `~/run-chromium.sh`
    - Now the autostart functionality should be set.  Test this by restarting the `Raspberry Pi`.
        - Once the `Raspberry Pi` has booted to the desktop, it should open the site after a few seconds.


## Setting up the `Dashboard Site`

### Setting up `Chromium`
- Open `Chromium` and go to the [Love Justice International Dashboard](https://LoveJustice.ngo)

- If prompted for a `KeyRing` just leave the fields blank and continue
    - It will give you a security warning, but just continue again.

- Then login with the `Dashboard Display Account` *(It is a organization-wide account that can view **all** data, but edit **no** data)*:
    - When asked to save credentials, say `Never`
        - This is because the credentials will be saved in the extension, **not the browser**.
        - This will prevent the `Save Credentials` dialog from ever popping up again.

### Setting up `LJI Auto Login`
1. Go into the `Extensions` settings in 2 ways:
    1. Go to [chrome://extensions/](chrome://extensions/)
    2. Click the `🧩` icon near the search bar
        - Then click `⚙️ Manage extensions`

2. Enable `Developer Mode` via the switch

3. Click `🗄️ Load Unpacked`

4. Select the folder [LJI Auto Login Web Extension](Web%20Extension/) in this repository.

### Saving Credentials
1. Now that the extension is loaded, you can view all browser extensions by clicking the `🧩` icon near the search bar.

2. Click on the `LJI Auto Login` extension from the list.

3. Enter the credentials for the `Display Account`

4. Click `Save`

**Now it should automatically log back into Searchlight after it gets logged out.**

# Conclusion

**Setup is complete!**

You can now unplug the mouse & keyboard.  You should now be able to display the dashboard by simply turning on the Raspberry Pi and TV.  The startup script will open the dashboard, once the computer boots to the desktop.

# Notes

If there is no WiFi, then it will infinitely ping `google.com`, so if the WiFi network is broken then just turn the TV and Raspberry Pi off and then back on once the network is fixed.  Or just leave it on, and it will reconnect eventually, if the network gets fixed.
# Raspberry Pi TV Setup

***By Jake Scott & Luke Stone***

## Prerequisite Hardware

- **`Raspberry Pi`**
    - The exact model we used was the `Model 4 B`, but as long as it has display and WiFi capabilities, then it should be fine.

- **`MicroSD Card`**
    - Doesn't need to be too big, just big enough to hold the OS and some cookies.

- **Power Cable**
    - The `Model 4 B` uses `USB-C` but some other models use `Micro-USB`

- **Display Cable**
    - Most `Raspberry Pi`s use a `Micro-HDMI`
        - If you already have a normal `HDMI` cable then you can get an adapter.
        - If not, then you can just get a `HDMI` to `Micro-HDMI` cable.

- **TV/Monitor**
    - It doesn't matter if it is a "*smart*" TV, all it needs is a display port for the `Raspberry Pi` to connect to.

## Raspberry Pi Setup Steps

1. Get an OS from [Raspberry Pi OS Downloads](https://www.RaspberryPi.com/software/operating-systems/) *(unless your `Raspberry Pi` did not already come with an OS preloaded on the MicroSD card)*.
    - We used `Raspbian GNU/Linux 12 Bookworm 32-bit`

2. Burn the downloaded OS to a `MicroSD` card *(if needed)*

3. Insert the `MicroSD` card into the `Raspberry Pi`'s `MicroSD` card slot.

4. Connect the `Raspberry Pi` to a power source
    - *Some TVs have USB ports on them to supply power to streaming devices like Chromecasts, Rokus, Fire Sticks, etc... .  If the TV has this, then use that to power the `Raspberry Pi`, so it turns on with the TV.*
    - If the TV doesn't have this, then just use another outlet and (un)plug the power cable to turn the `Raspberry Pi` on & off.

5. Connect the display cable to the `Raspberry Pi` and the TV
    - Make sure that the TV is set to auto-detect input, or set it to always go to `HDMI 1` *(or something like that by default)*.
    - *The TV might have a sleep timer set to turn off after a while if no remote buttons are pressed.  You might have to change this in the settings.*

6. Finish the OS setup process
    - **This will require a mouse and keyboard**
        - Other models might use Micro-USB and might need a splitter to use both mouse & keyboard *(even though the model might have 2 `Micro-USB` ports, 1 will be used for the power cable)*

    - For this section you will mostly just follow the OS's built-in instructions.
        - **It will take around 10 minutes, if you check for updates (*which is reccomended*)**

    - If using WiFi:
        - Connect it to the desired network, by entering the password.

    - If the `Raspberry Pi` has an Ethernet port *(like the `Model 4 B`)*:
        - Insert the Ethernet cable into the Ethernet port and ensure that it has an Internet connection.

    - When prompted for a browser
        - Choose `Chromium` **not `Firefox`**
        - Check `Uninstall the unused browser`

7. Open this repository's page on the `Raspberry Pi`: https://github.com/LoveJustice/office-tv-engagement-infrastructure.
    - When opening `Chromium` for the 1st time you will be prompted for a `KeyRing` just leave the fields blank and click `Continue`
        - It will give you a security warning, but just click `Continue~ again.
    - You must log in to a `GitHub` account in the `Love Justice` organization
        - **When asked to `Save Credentials` click `Never`**
    - **The repository's contents need to be downloaded on the `Raspberry Pi`**
        - Do this by clicking the green `<> Code` button and selecting `Download ZIP`.
    - **Log out of `GitHub` once you've downloaded the files!**
    - Unzip the folder

8. Run [setup.sh](setup.sh) to create the autostarting functionality:
    - **Before you run the [setup.sh](setup.sh), go into [autostart](Autostart%20Scripts/autostart) and change `user_name` to whatever username you used to setup the OS in `Step 6`.**
        - [setup.sh](setup.sh) will give an error and stop running if it detects that [autostart](Autostart%20Scripts/autostart) still says: `/home/user_name/run-chromium.sh`.
        - Change the `user_name` in [autostart](Autostart%20Scripts/autostart) by using `TextEdit` *(or a similar program)*.
    - [setup.sh](setup.sh) will do `2` things:
        1. Copy [autostart](Autostart%20Scripts/autostart) to `~/.config/labwc/autostart`
        2. Copy [run-chromium.sh](Autostart%20Scripts/run-chromium.sh) to `~/run-chromium.sh`
    - Make [setup.sh](setup.sh) executable in 1 of 2 ways:
        1. `Terminal`:
            - Navigate to [setup.sh](setup.sh)
            - By running the command `chmod +x setup.sh`
        2. `File Explorer`:
            - Navigate to [setup.sh](setup.sh)
            - Right click on [setup.sh](setup.sh) and click `Properties`
            - Then go into `Permissions` and make it `Executable` by all `Anyone`.
    - **Run the script by doing `./setup.sh`**

**Now the autostart functionality should be set.**


## Setting up the `Dashboard Site`

### Setting up `LJI Auto Login`
1. Go into the `Extensions` settings in 2 ways:
    1. Go to [chrome://extensions/](chrome://extensions/)
    2. Click the `🧩` icon near the search bar
        - Then click `⚙️ Manage extensions`

2. Enable `Developer Mode` via the switch

3. Click `🗄️ Load Unpacked`

4. Select the folder [LJI Auto Login Web Extension](Web%20Extension/) in this repository.

**Now it should automatically log back into Searchlight after it gets logged out.**

### Saving Credentials
1. Now that the [LJI Auto Login](LJI%20Auto%20Login/) browser extension is loaded, you can view all browser extensions by clicking the `🧩` icon near the search bar.

2. Click the `📌` icon to pin [LJI Auto Login](LJI%20Auto%20Login/) for easy access.

3. Click on the `LJI Auto Login` extension from the list.

4. Enter the `email`/`username` & `password` for the `Display Account` *(It is a organization-wide account that can view **all** data, but edit **no** data)*.

5. Click `Save`

### Initial site login
1. Open `Chromium` and go to the [Love Justice International Dashboard](https://test.searchlight.ljiapps.com)

2. The [LJI Auto Login](LJI%20Auto%20Login/) browser extension should automatically log in to the site:
    - When asked to save credentials, say `Never`
        - This is because the credentials will be saved in the extension, **not the browser**.
        - This will prevent the `Save Credentials` dialog from ever popping up again and blocking content on the screen.

# Conclusion
**Setup is complete!**

Test by restarting the `Raspberry Pi`.  Once the `Raspberry Pi` has booted to the desktop, it should open the site after a few seconds.


## Notes

- *If there is no WiFi, then it will ping `google.com` `30` times.  So if the WiFi network is broken then just turn the TV and `Raspberry Pi` off and then back on once the network is fixed.*
# PhyESPx Building Instructions <img src="https://user-images.githubusercontent.com/73055949/224374773-722d08f8-42a1-4fda-a30c-9cfbf2ab77b4.png" height="45" align="right">
## Building and programming the transmitter
The key element of the data acquisition system is the transmitter part, which contains the microcontroller as well as the battery (with BMS). For building one unit, you will need:
<br>
* Electronic Stuff
  * ESP32 Development Board (30-pin version)
  * Card Edge Female Connector (2x6 pin, 3.96mm pitch)
  * LiPo Battery (802540 3.7V)
  * Battery Management System PCB (HW-775)
  * WS2812b Single LED PCB (10mm diameter)
  * 2 pcs. Push Button (6x6x4.3mm)
* Casing Stuff
  * 2 pcs. Threaded Insert M4 (recommended; however, you can also screw into the plastic directly)
  * 2 pcs. M4 Screw 10mm
  * 3D Printing PLA Filament (e.g. black and white)
  * Stickers (which you can run through your office printer)
<br>
 ...as well as some tools, soldering equipment, a 3d printer, and a hot glue gun (recommended).
<br><br>
To start things off, you can print all <a href="https://github.com/deebuggertech/PhyESPx/tree/main/how%202%20build/3d%20models">3d models you can find in this folder</a>. I recommend using some white filament for the top and bottom part while printing the divider, the pins (you will need the 10mm version twice and the 20mm version once), and the buttons (print the file twice) with some black filament. I personally used some PLA along with a .4 mm Nozzle (0.25 mm layer height) and am quite satisfied with the results.
<br><br>
Once you finish printing, you can use a soldering iron to insert the inserts and check, if everything fits as intended.
<br><br>
In the next step, you'll have to assemble the battery and BMS unit, which will be located in the bottom section of the case (below the divider). As a first step, you might want to check your battery for potential damages and proper charging and discharging behavior, as it will be glued in place later and thus not be easily replaceable. You have to solder the battery to the BMS PCB and add some loose wires to the voltage input (aka. charging) and output (aka. supply voltage) terminals. Additionally, you have to desolder the standby button and attach some loose wires instead (which worked great for me because the button on my unit had some THT holes beneath).
<br><br>
Check if the setup works properly by attaching a button temporarily to the standby button wires and a multimeter to the output. Then, glue the battery and the BMS in the bottom casing part and put the divider right on top. Use some short wires to connect the ESP32, the card edge connector, the buttons, and the LEDs according to this schematic.
<br><br>
<img src="https://github.com/deebuggertech/PhyESPx/assets/73055949/4271f7b5-fda7-431e-ab4b-d3eb73a6977b" width="100%">
<br><br>
Upload <a href="https://github.com/deebuggertech/PhyESPx/tree/main/esp32">the sketch</a> to the ESP32 using the Arduino IDE. Make sure to modify the network setup according to your needs. This involves:<br>
- Adding your WiFi credentials (<b>WiFi_SSID, WiFi_PASSWD</b>)<br>
- Adjusting the transmitter ID (<b>transmitterID</b>)<br>
- Adjusting the IP settings according to your network environment (<b>local_IP</b>)
<br><br>
If everything works, you should be able to see a "Sample Sensor" in your device dashboard and get some sample data from it. You can continue by closing up the case and attaching the labels.
<br><br>
Done!


## Building and programming a sensor
I provided the <a href="https://github.com/deebuggertech/PhyESPx/tree/main/how%202%20build/3d%20models">3d models for some pre-designed sensor elements</a>, however, creating a custom one shouldn't be too complex either. The building procedure is quite similar for all sensors, so the following steps are very generic...<br><br>
One peculiarity in building the sensors is the need for a custom PCB, as at the time I was building the system, I could not find any male edge connectors that seemed suitable for use in the system. Therefore, I designed some very simple PCBs and had them manufactured in China. If you're using the same female connector as I did during the build, you can use the provided PCB design and simply reorder them. But please double-check if the design files will fit in the connector.<br><br>
For building a sensor, you will need:
<br>
* Electronic Stuff
  * EEPROM Module with IIC Interface (AT24C02)
  * Card Edge Male Connector PCB (as mentioned above)
  * Sensor with IIC or SPI interface (according to your needs)
* Casing Stuff
  * min. 2 pcs. Threaded Insert M4 (recommended; however, you can also screw into the plastic directly)
  * min. 2 pcs. M4 Screw 10mm
  * 3D Printing PLA Filament (e.g. black and white)
  * Stickers (which you can run through your office printer)
<br>
 ...as well as some tools, soldering equipment, and a 3d printer.
<br><br>
Just like during the construction of the transmitter, start by (designing and) printing the enclosure.
<br><br>
In the following, you will have to decide on a unique ID that the sensor will get to be identified by the transmitters. A sensor ID is a natural number up to 254. You can write the sensor ID to the memory chip by running <a href="https://github.com/deebuggertech/PhyESPx/tree/main/how%202%20build/eeprom">the provided EEPROM code</a> on a spare microcontroller (Arduino / ESP8266 / ESP32) and connecting the EEPROM module to the microcontroller (power and IIC) when the serial monitor shows the message that the desired sensor ID will be written in five seconds. Unplug the EEPROM module quickly after the sensor ID has been written and verified twice. 
<br><br>
Now, you'll have to update the code for the transmitters in order for them to work with the new sensor. Therefore, you'll have to make some changes to the <b>sensors.ino</b> file. Add libraries according to your needs, and append additional cases to the switch-case-statements in the <b>setupSensor()</b> and <b>readSensor()</b> methods to specify the setup and operation of the new sensor.
<br><br>
Finish the hardware setup by connecting the programmed EEPROM module and the sensor to the card edge connector PCB (parallel connections when dealing with an IIC sensor), installing everything in the enclosure, and testing. (You might have to use the UI Builder on the project website)
<br><br>
Done!


## Setting up the central UI server
To provide fast UI loading speeds, the web interface code is loaded from a central web server instead of from the ESP32s directly. Thus, to use the sensor kit, you need to set up your own server in your local network. You can use an existing server (for example a proxmox container) or set up a Raspberry Pi by installing the Apache Web Server (tested with vers. 2.4.54) and PHP (tested with vers. 7.4.30).<br>
In the next step, you can copy all <a href="https://github.com/deebuggertech/PhyESPx/tree/main/web%20interface">web interface files</a> to the "http" directory on the server and check if everything is running by trying to access the UI by entering the server IP into a web browser (running on a device in the local network).<br><br>
<b>Please make sure your network allows communication between network devices.<br>
It is mandatory that the server and the transmitters are running in the same subnet (255.255.255.0)</b>
<br><br>
Done!

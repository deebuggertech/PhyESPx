# PhyESPx <img src="https://user-images.githubusercontent.com/73055949/224374773-722d08f8-42a1-4fda-a30c-9cfbf2ab77b4.png" height="45" align="right">
...is an open-source data acquisition system for MINT education. It is designed to be specifically robust, very easy to use, and low-cost while providing decent data rates as well as an extensive functionality. PhyESPx sensor kits can measure all kinds of physical parameters and transmit the acquired data to a web interface that can be accessed on tablets, laptops, or PCs. Multiple sensor kits can be used at the same time due to mesh-based (WiFi) data transmission, or can be combined within multi-axis charts for more complex experiments.

## How to use the sensor kit?
A PhyESPx sensor kit consists of a <b><i>transmitter</i></b> and one or more <b><i>sensors</i></b>. To use a sensor, attach it to the transmitter via the built-in hardware interface locking mechanism. Turn on the transmitter and access the corresponding user interface via the QR code on the transmitter housing, which can be scanned with a smartphone or tablet, or the device hub, which is accessible via a local web service. Start data acquisition using the controls within the web interface or the buttons on the transmitter and watch your readings being displayed in real-time. To analyze or process the acquired data further, export it in various formats, such as .csv or .json.

## Something about the working principle...
PhyESPx heavily relies on commercial sensor circuits for reading physical parameters. Those are available in a huge variety and often contain ADCs with I²C or SPI support, however, you may also have to manually install ADCs yourself. A PhyESPx sensor consists of the sensor circuit (with ADC), a little flash memory chip (containing the sensor ID for automatic sensor detection), and an interface connector (for electrical connection to the transmitter), which are fitted in a 3d-printed enclosure.

The PhyESPx transmitter is based on the ESP32 microcontroller, which supports the I²C and SPI protocols, has a built-in WiFi interface, and is powered by a LiPo battery (600mAh --> approx. 4:30 runtime). The transmitter is responsible for reading out the data from the sensor and wirelessly transmitting it to the connected user interfaces.

The web interfaces for the different sensors as well as the <b><i>device hub</i></b> are provided by a central web server. Once loaded, the <b><i>device hub</i></b> will search for PhyESPx transmitters that are available from the client device and allow to access their web interfaces (while displaying some information on the attached sensors). The web interface (which is sensor-specific) establishes a websocket connection to the transmitter and can be used to control and analyze the experiments. 

## How to set it up?
Further information for building and setting up the sensor kit can be found <a href="https://github.com/deebuggertech/PhyESPx/tree/main/how%202%20build">on this page</a>. You will need a very basic understanding of microelectronics, networks, and some tools (including soldering eqipment and a 3d printer). If you have any questions, <a href="mailto:dee.bugger.tech@gmail.com">I'm happy to help you</a>!

## Advantages of the System
<b>PhyESPx is...</b>
<ul>
<li><b>easy to set up and handle</b> (simple control and connection management with a web UI)</li>
<li><b>robust and failsafe</b> (can also be used by younger students)</li>
<li><b>extremely inexpensive</b> (transmitter unit parts cost ≈ 15€)</li>
<li><b>scalable</b> (several sensor kits can be operated in parallel within one network)</li>
<li><b>cross-platform usable</b> (works with nearly all OSs and on laptops, tablets, phones)</li>
<li><b>secure in terms of privacy</b> (there's no need to install an app on the client device)</li>
<li><b>extendable</b> (you can develop new sensors according to your needs)</li>
<li><b>open source</b> (here you go)</li>
</ul>

## Any more questions?
...feel free to <a href="mailto:dee.bugger.tech@gmail.com">contact me</a> or open an issue! Maybe the <a href="https://deebugger.de/projects/phyespx/">project website</a> can help?

## Legal stuff...

(1) The PhyESPx web interface contains structural and design elements from the <a href="https://github.com/phyphox">phyphox project</a>, which is distributed under the GNU 3.0 license.

(2) The PhyESPx web interface uses the javascript library <a href="http://chartjs.org">chart.js</a>. Chart.js is distributed under the MIT licence.

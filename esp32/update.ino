//PhyESPx
//by deebugger.de

#include <ArduinoOTA.h>

void setupAutoUpdate(){
    USE_SERIAL.print("Setting up OTA... ");
    String hostname = "Server";
    hostname += transmitterID;
    ArduinoOTA.setHostname(hostname.c_str());
    ArduinoOTA.setPassword("nutella");
    ArduinoOTA.begin();
    USE_SERIAL.println("Done!");
}

void checkForAutoUpdate(){
    ArduinoOTA.handle();
}
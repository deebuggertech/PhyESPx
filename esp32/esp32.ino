//PhyESPx
//by deebugger.de

#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

///* Software Version Code  *///
const char* SOFTWARE_VERSION = "3.7.1"; //(10.02.23)

///* Put Your 2.4GHz WiFi Credentials Here *///
const char* WiFi_SSID = "YOUR_SSID";//                    <---MODIFY!
const char* WiFi_PASSWD = "YOUR_PASSWD";//                <---MODIFY!

///* Every Transmitter Has Its Own ID *///
const byte transmitterID = 1;//                           <---MODIFY!

///* WiFi Network Settings *///
IPAddress local_IP(192, 168, 178, 200+transmitterID); //  <---Make Sure IP-Address Is Working!
IPAddress gateway(192, 168, 178, 1);
IPAddress subnet(255, 255, 255, 0);

///* Start Stop Button Pin *///
const int buttonPin = 4;

DynamicJsonDocument doc(1024);
WebSocketsServer webSocket = WebSocketsServer(81);

#define USE_SERIAL Serial //set to Serial for deeeeebugging

byte sensorID = 0; //1: illuminance sensor; 2: current sensor; 3: speed sensor; 4: voltage sensor;
int sensorUpdateInterval = 100; //can be specified in sensor setup (default: 100ms delay --> 10Hz)
String experimentStatus = "clear"; //"clear", "run", "pause"


void setup() {
    USE_SERIAL.begin(115200);
    USE_SERIAL.setDebugOutput(true);
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    setupStatusLED();

    if (!WiFi.config(local_IP, gateway, subnet)) {
    USE_SERIAL.println("IP Config Failed");
    }

    WiFi.begin(WiFi_SSID, WiFi_PASSWD);

    USE_SERIAL.print("Connecting to WiFi");
    while(WiFi.status() != WL_CONNECTED){
    showConnectingAnimation();
    USE_SERIAL.print(".");
    }
    USE_SERIAL.println();

    USE_SERIAL.print("Connected to ");
    USE_SERIAL.print(WiFi.SSID());              
    USE_SERIAL.print(" with IP ");
    USE_SERIAL.println(WiFi.localIP());
    USE_SERIAL.print("Subnet Mask: ");
    USE_SERIAL.println(WiFi.subnetMask());
    USE_SERIAL.print("Gateway IP: ");
    USE_SERIAL.println(WiFi.gatewayIP());

    USE_SERIAL.print("Setting up WebSocket Server... ");
    webSocket.begin();
    webSocket.onEvent(webSocketEvent);
    webSocket.enableHeartbeat(1000, 500, 2);
    USE_SERIAL.println("Done!");

    setupButton();

    setupAutoUpdate();

    setupSensor();  

    setStatusLedIdle();
}

double startTime, lastSessionDuration; //session parameters for "time" dataset in experiment

void onRun(){
  webSocket.broadcastTXT("{\"status\":\"run\"}");
  experimentStatus = "run";
  setStatusLedRunning();
  startTime = millis() - lastSessionDuration;
}

void onPause(){
  webSocket.broadcastTXT("{\"status\":\"pause\"}");
  experimentStatus = "pause";
  lastSessionDuration = millis() - startTime;
  setStatusLedConnected();
}

void onClear(){
  webSocket.broadcastTXT("{\"status\":\"clear\"}");
  experimentStatus = "clear";
  startTime = 0;
  lastSessionDuration = 0;  
 setStatusLedConnected();
}

long lastPingReceived; //runtime last ping received
bool clientAvailable = false; //at least one client is available

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_CONNECTED:
            {
                webSocket.sendTXT(num, "{\"deviceID\":\""+String(transmitterID) +"\", \"sensorID\":\""+String(sensorID)+"\"}");
                webSocket.broadcastTXT("{\"status\":\""+String(experimentStatus)+"\"}");
                if (experimentStatus != "run") setStatusLedConnected();
                clientAvailable = true;
            }
            break;
        case WStype_TEXT:
            if(String((char *)payload).equals(String("ping"))){ 
              webSocket.broadcastTXT("pong");
              lastPingReceived = millis();
              if(!clientAvailable){ //for initial connection set
              setStatusLedConnected();
              clientAvailable = true;
              }
              
            }else{
            DeserializationError error = deserializeJson(doc, payload);
            if (error) {
              USE_SERIAL.print(F("deserializeJson() failed: "));
              USE_SERIAL.println(error.f_str());
            }else{
              if(doc["set_status"]){
                experimentStatus = doc["set_status"].as<String>();
                if(experimentStatus.equals("clear")){
                onClear();
                }else if(experimentStatus.equals("run")){
                onRun();
                }else if(experimentStatus.equals("pause")){
                onPause(); 
                }
              }
            }
            }
            break;
    }
}

long lastPackageSent;
void loop() {

    checkForAutoUpdate();
    checkForButtonPressed();
    checkForSensorChanged();
    
    webSocket.loop();

    if(experimentStatus.equals("run")){ //gather data
    if(millis()-lastPackageSent > sensorUpdateInterval){
    lastPackageSent = millis();//right at the start to exclude processing time
    doc.clear();
    doc["time"] = (millis()-startTime) / 1000;
    readSensor();
    String dataset;
    serializeJson(doc, dataset);  
    webSocket.broadcastTXT(dataset);
    }
    }

    ///** Ping Handler **///
    if(millis() - lastPingReceived > 3500){ //ping timeout
    setStatusLedIdle(); 
    clientAvailable = false; 
    }
}

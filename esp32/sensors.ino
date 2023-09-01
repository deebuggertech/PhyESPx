//PhyESPx
//by deebugger.de

#include <AT24Cxx.h> //EEPROM Libary

#include <Adafruit_INA219.h>
#include <Adafruit_ADS1X15.h>
#include "DFRobot_VEML7700.h"
#include "Adafruit_VL53L0X.h"

AT24Cxx eep(0x50, 32);
Adafruit_INA219 ina219;
Adafruit_ADS1115 ads;
DFRobot_VEML7700 als;
Adafruit_VL53L0X lox = Adafruit_VL53L0X();

int lastVL53L0XVal = 0;

void setupSensor(){
    USE_SERIAL.print("Sensor ID = ");
    byte id = eep.read(0);
    USE_SERIAL.println(id);
    if(id == 255){ //255 = "-1"
    sensorID = 0;
    }else{
    sensorID = id;  
    }
    USE_SERIAL.println("Setting up Sensor... ");
    switch(sensorID){
    case 0:
      USE_SERIAL.print("    Setting up Virtual Sample Sensor... ");
      sensorUpdateInterval = 50;
      USE_SERIAL.println("Done!"); 
    break;
    case 1:
      USE_SERIAL.print("    Setting up Illuminance Sensor... ");
      als.begin();
      sensorUpdateInterval = 100;
      USE_SERIAL.println("Done!"); 
    break;
    case 2: 
      USE_SERIAL.print("    Setting up Current Sensor... ");
      if (ina219.begin()) {
        USE_SERIAL.println("Done!");
        sensorUpdateInterval = 100;
      }else{
        USE_SERIAL.println("Failed to find INA219 chip");
        delay(1000);
        ESP.restart();
      }
    break;
    case 3: 
      USE_SERIAL.print("    Setting up Optical Stopwatch... ");
      Wire.begin();
      sensorUpdateInterval = 500;
      USE_SERIAL.println("Done!"); 
    break;
    case 4: 
      USE_SERIAL.print("    Setting up Voltage Sensor... ");
      ads.setGain(GAIN_ONE);
      if (ads.begin()) {
        USE_SERIAL.println("Done!");
        sensorUpdateInterval = 100;
      }else{
        USE_SERIAL.println("Failed to find ADS1115 chip");
        delay(1000);
        ESP.restart();
      }
    break;
    case 5: 
      USE_SERIAL.print("    Setting up Distance Sensor... ");
      if (!lox.begin()) {
          Serial.println(F("Failed to boot VL53L0X"));
          delay(1000);
          ESP.restart();
      }else{
        lox.setMeasurementTimingBudgetMicroSeconds(30000);
        lox.startRangeContinuous();
      }
      sensorUpdateInterval = 33;
      USE_SERIAL.println("Done!"); 
    break;
    }
    USE_SERIAL.println("Done!");
}

void readSensor(){
  switch(sensorID){
      case 0: 
      doc["sample"] = 10 * random(1,5) * sin(((millis()-startTime) / 1000));
      break;
      
      case 1: 
      float illu;
      als.getALSLux(illu);
      doc["illuminance"] = illu;
      break;
      
      case 2:
      doc["current"] = ina219.getCurrent_mA();
      break;
      
      case 3: 
      long x;
      byte d[4];
      Wire.requestFrom(0x50, 5);
      Wire.read(); //sensor ID is transmitted in first byte but isn't needed here
      d[0]= Wire.read();
      d[1]= Wire.read();
      d[2]= Wire.read();
      d[3]= Wire.read();
      x = *((long *)d);
      doc["duration"] = x/1000.0;
      if(x == 0){
      doc["state"] = "armed";
      }else{
      doc["state"] = "triggered"; 
      onPause(); 
      }
      break;

      case 4:
      doc["voltage"] = -ads.readADC_Differential_0_1()*2.1;
      break;

      case 5:  
      int distance = 1.09*lox.readRange()-4;
      if (distance < 1100 && distance > 50) {
        doc["distance"] = distance;
        lastVL53L0XVal = distance;
      } else {
        doc["distance"] = lastVL53L0XVal;
      }
      break;
    }
}

long lastCheckForSensorChanged;

void checkForSensorChanged(){
  if(millis()-lastCheckForSensorChanged > 2000){
   byte id = eep.read(0);
   if((id != 255 && id != sensorID) || (id == 255 && sensorID != 0)){
     ESP.restart();
   }
  lastCheckForSensorChanged = millis();
}
}
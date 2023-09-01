//PhyESPx
//by deebugger.de

#include <AT24Cxx.h>

///* Software Version Code  *///
const char* SOFTWARE_VERSION = "0.1";

#define i2c_address 0x50

AT24Cxx eep(i2c_address, 32);

void setup() {
  Serial.begin(115200);
}

void loop() {

  for(int i = 1; i <= 254; i++){
  Serial.print("writing id ");
  Serial.print(i);
  Serial.println(" in 5 seconds...");
  delay(5000);
  Serial.print("clearing first 100 bit - ");
  for (int i = 0 ; i < 100 ; i++)
  {
    eep.update(i, 0);
  }
  Serial.println("done");
  eep.write(0, i);  
  Serial.println("id written");
  delay(1000);
  Serial.print("value on eeprom: ");
  Serial.println(eep.read(0));
  delay(1000);
  Serial.print("value on eeprom: ");
  Serial.println(eep.read(0));
  delay(1000);
  Serial.print("\n\n");
  }


  while(true){
  Serial.print("value on eeprom: ");
  Serial.println(eep.read(0));
  delay(1000); 
  }

}

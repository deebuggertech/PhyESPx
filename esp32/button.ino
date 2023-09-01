//PhyESPx
//by deebugger.de

void setupButton(){
    USE_SERIAL.print("Setting up Hardware Trigger... ");
    pinMode(buttonPin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(buttonPin), interruptTriggered, FALLING);
    USE_SERIAL.println("Done!");
}

long lastInterrupt;
bool interruptFlag = false;

void interruptTriggered() {
  if(millis()-lastInterrupt > 500){
    interruptFlag = true; //flag workaround (ISR)
    lastInterrupt = millis();
  }
}

void checkForButtonPressed(){
      if(interruptFlag){
      if(experimentStatus == "run"){
        USE_SERIAL.println("interrupt-pause");
        onPause();
      }else{
        USE_SERIAL.println("interrupt-run");
        onRun();
      }
      interruptFlag = false;
    } 
}
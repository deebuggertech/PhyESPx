//PhyESPx
//by deebugger.de

#include <Adafruit_NeoPixel.h>

Adafruit_NeoPixel pixel(1, 5, NEO_GRB + NEO_KHZ800);

void setupStatusLED(){
    pixel.begin();
    for(int i = 0; i < 15; i++){
    setStatusLedColor(i*5,0,0);
    delay(40);
    }
}

void showConnectingAnimation(){
    for(int i = 15; i > 0; i--){
    setStatusLedColor(i*5,0,0);
    delay(40);
    }
    for(int i = 0; i < 15; i++){
    setStatusLedColor(i*5,0,0);
    delay(40);
    }
}

void setStatusLedIdle(){
  setStatusLedColor(50,50,50);  
}

void setStatusLedConnected(){
  setStatusLedColor(0,0,80);
}

void setStatusLedRunning(){
  setStatusLedColor(0,80,0);
}

void setStatusLedColor(int r, int g, int b){
pixel.setPixelColor(0, pixel.Color(r*2.55, g*2.55, b*2.55));
pixel.show();  
}

//Definitely over complicated...
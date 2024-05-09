const int upButtonPin = 4; // Define the pin connected to the button
const int downButtonPin = 3; // Define the pin connected to the button
const int leftButtonPin = 5; // Define the pin connected to the button
const int rightButtonPin = 2; // Define the pin connected to the button
const int POTENTIOMETER_PIN = A0;
const int MAX_ANALOG_VAL = 1023;

void setup() {
  // Set the potentiometer pin to input
  pinMode(POTENTIOMETER_PIN, INPUT);

  // set the button pins to output
  pinMode(upButtonPin, OUTPUT); 
  pinMode(downButtonPin, OUTPUT); 
  pinMode(leftButtonPin, OUTPUT); 
  pinMode(rightButtonPin, OUTPUT); 
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  // Read the state of each of the buttons
  int upButtonState = digitalRead(upButtonPin);
  int downButtonState = digitalRead(downButtonPin);
  int leftButtonState = digitalRead(leftButtonPin);
  int rightButtonState = digitalRead(rightButtonPin);
  int potentiometerValue = analogRead(POTENTIOMETER_PIN);
  float valFrac = potentiometerValue / (float)MAX_ANALOG_VAL;

  // Print the values separated by commas for processing
  Serial.print(leftButtonState);
  Serial.print(",");
  Serial.print(upButtonState);
  Serial.print(",");
  Serial.print(downButtonState);
  Serial.print(",");
  Serial.print(rightButtonState);
  Serial.print(",");
  Serial.println(valFrac, 4);


  delay(100); // Add a small delay 
}
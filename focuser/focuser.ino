unsigned int stepInverval;
unsigned int voltage;
char motorPins[4] = {4,5,6,7};
char cycleState;
char runMode;
char blue_state;
char red_state;
char buf;
unsigned int bufNdx = 0;
#define BLUE_BUTTON 8
#define RED_BUTTON 3
char cycle[8][4] = {{HIGH, HIGH, LOW, LOW},
                  {LOW, HIGH, LOW, LOW},
                  {LOW, HIGH, HIGH, LOW},
                  {LOW, LOW, HIGH, LOW},
                  {LOW, LOW, HIGH, HIGH},
                  {LOW, LOW, LOW, HIGH},
                  {HIGH, LOW, LOW, HIGH},
                  {HIGH, LOW, LOW, LOW}};
void setup() {
  stepInverval = 1;
  cycleState = 0;
  runMode = 0;
  Serial.begin(9600);
  Serial1.begin(9600);
  for(int i = 0; i < 4; i++) {
    pinMode(motorPins[i], OUTPUT);
  }
  pinMode(RED_BUTTON, INPUT_PULLUP);
  pinMode(BLUE_BUTTON, INPUT_PULLUP);
}


void loop() {
  if(Serial.available()) {
    Serial.println(Serial.read());
  }
  voltage = analogRead(A4);
  red_state = digitalRead(RED_BUTTON);
  blue_state = digitalRead(BLUE_BUTTON);
  runMode = red_state == LOW ? 1 : 0;
  if(!runMode) {
   runMode = blue_state == LOW ? -1 : 0; 
  }
  delayMicroseconds(vol2interval(voltage));
  for(int i = 0; i < 4; i++) {
    digitalWrite(motorPins[i], cycle[cycleState][i]);
  }
  cycleState += runMode;
  cycleState = cycleState > 7 ? 0 : cycleState;
  cycleState = cycleState < 0 ? 7 : cycleState;
}

int vol2interval(int voltage) {
  return round(700 + (double)voltage * (double)voltage * 0.03);
}


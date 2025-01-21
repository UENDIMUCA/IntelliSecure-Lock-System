#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Stepper.h>
#include <Keypad.h>
#include <PubSubClient.h>  // Include the MQTT library

#define ROW_NUM     4 // four rows
#define COLUMN_NUM  4 // four columns

#define RST_PIN 22   // Pin RST pour RC522
#define SDA_PIN 21   // Pin SDA pour RC522

// ULN2003 Motor Driver Pins
#define IN1 32
#define IN2 33
#define IN3 25
#define IN4 16

#define BUZZER_PIN 26 // Pin pour buzzer

MFRC522 mfrc522(SDA_PIN, RST_PIN);  // Créer une instance de MFRC522

bool doorOpen = true;
const int stepsPerRevolution = 512;

Stepper myStepper(stepsPerRevolution, IN1, IN3, IN2, IN4); // initialize the stepper library

// WiFi configuration
const char ssid[] = "lucas";
const char password[] = "draisine";

// MQTT configuration
const char* mqtt_server = "mosquitto.intelli-secure.tom-fourcaudot.com";  // Replace with your MQTT broker address
const int mqtt_port = 1883; // Standard MQTT port
const char* mqtt_user = "admin";  // Your MQTT username
const char* mqtt_pass = "mot-de-passe-super-secret";  // Your MQTT password
const char* mqtt_client_id = "esp32_client";   // Unique client ID for the MQTT connection
const char* topic = "statusTopic";
bool mqttConnected = false;

WiFiClient espClient;
PubSubClient client(espClient);  // Create an MQTT client

char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

char numbers[10] = {'1','2','3','4','5','6','7','8','9','0'};
char functions[2] = {'A','B'};
String pin = "";

byte pin_rows[ROW_NUM] = {5, 4, 17, 15};
byte pin_column[COLUMN_NUM] = {13, 12, 14, 27};

Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );

// Server configuration
const String authApiUrl = "https://api.intelli-secure.tom-fourcaudot.com/api/auth/";

void setup() {
  // set the speed at 15 rpm
  myStepper.setSpeed(15);

  Serial.begin(115200);   // Initialiser la communication série

  // WiFi setup
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
  Serial.println(WiFi.localIP());

  // Set up MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);

  SPI.begin();            // Initialiser le bus SPI
  mfrc522.PCD_Init();     // Initialiser le module RC522
  Serial.println("Lecteur RFID prêt.");

  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  handlePin();
  handleRFID();

  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();  // Process incoming messages and handle connection
}

// --- Handle Pin ---
void handlePin() {
  char key = keypad.getKey();

  if (key) {
    if (key >= '0' && key <= '9') {
      Serial.println("number");
      if (pin.length() >= 4) {
        pin = ""; 
        triggerAlert(100, 50, 3); 
      } else {
        triggerAlert(100, 0, 1); 
        pin += String(key); 
      }
      Serial.println(pin);  
    }
    else if (key == 'A' || key == 'B') {
      if (key == 'A') {
        triggerAlert(100, 0, 1); 
        send("pin_login", pin);
        pin="";
      } else if(pin.length()>0) {
        triggerAlert(100, 50, 2);
        pin = ""; 
      }
    }
  }
}

// --- Handle RFID ---
void handleRFID() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }

 // Get RFID UID
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }

  uid.toUpperCase();

  Serial.println(uid);

  triggerAlert(200, 0, 1);

  send("rfid_login", uid);

  mfrc522.PICC_HaltA();
}

int send(String endURL, String value) {
  int httpResponseCode = -1;
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String type = "";
    if(endURL == "rfid_login") {
      type = "uid";
    } else if(endURL == "pin_login") {
      type = "pincode";
    }
    http.begin(authApiUrl + endURL);
    http.addHeader("Content-Type", "application/json");
    String httpRequestData = "{\"" + type + "\":\"" + value + "\"}";
    Serial.println(httpRequestData);
    httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);

      if (httpResponseCode == 404) {
        publishStatus("error", "Not authorized");
        triggerAlert(100, 50, 3);
        delay(5000);
        publishStatus("nothing", "Waiting...");
      } else if (httpResponseCode == 201) {
        publishStatus("success", "Successfully update rfid");
        triggerAlert(500, 0, 1);
        delay(5000);
        publishStatus("nothing", "Waiting...");
      } else {
        if(doorOpen){
          publishStatus("success", "Closing the door");
        }else{
          publishStatus("success", "Opening the door");
        }
        triggerAlert(500, 0, 1);
        door();
        delay(5000);
        publishStatus("nothing", "Waiting...");
      }
    } else {
      Serial.print("Error in POST request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi disconnected");
  }

  return httpResponseCode;
}

void door() {
  if (!doorOpen) {
    myStepper.step(-stepsPerRevolution); // Ouvrir
  } else {
    myStepper.step(stepsPerRevolution); // Fermer
  }
  doorOpen = !doorOpen; // Basculer l'état
}

void triggerAlert(int _delay, int _delay2, int loop) {
  for(int i = 0; i < loop; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(_delay);
    digitalWrite(BUZZER_PIN, LOW);
    delay(_delay2);
  }
}

void publishStatus(String status, String content) {
  if (mqttConnected) {  // Vérifie si le client MQTT est connecté
    String payload = "{\"status\":\"" + status + "\", \"content\":\"" + content + "\"}";
    Serial.println("Envoi du message MQTT: " + payload);
    client.publish(topic, payload.c_str());
  } else {
    // Si le client MQTT n'est pas connecté, afficher un log d'erreur
    Serial.println("Erreur : Le client MQTT n'est pas connecté.");
  }
}

// --- MQTT Reconnect Function ---
void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(mqtt_client_id, mqtt_user, mqtt_pass)) {
      Serial.println("connected");
      mqttConnected = true;
       // Subscribe to a topic after successful connection
      if (client.subscribe("doorTopic")) {  
        Serial.println("Successfully subscribed to topic: doorTopic");
      } else {
        Serial.println("Failed to subscribe to topic.");
      }
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);  // Wait 5 seconds before retrying
    }
  }
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message received on topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  Serial.println(message);

  // Vérifier si l'action est "openDoor"
  if (message == "openDoor" && !doorOpen) {
    publishStatus("success", "Opening the door");
    triggerAlert(500, 0, 1);
    door();
    delay(5000);
    publishStatus("nothing", "Waiting...");
  }
}

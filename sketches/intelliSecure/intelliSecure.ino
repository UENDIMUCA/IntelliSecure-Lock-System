#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define RST_PIN 22   // Pin RST pour RC522
#define SDA_PIN 21   // Pin SDA pour RC522

#define BUZZER_PIN 26 // Pin pour buzzer

MFRC522 mfrc522(SDA_PIN, RST_PIN);  // Créer une instance de MFRC522

// WiFi configuration
const char ssid[] = "lucas";
const char password[] = "draisine";

// Server configuration
const String authApiUrlRFID = "http://172.20.10.4:3000/api/auth/rfid_login";

WiFiClient espClient;

void setup() {
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

  SPI.begin();            // Initialiser le bus SPI
  mfrc522.PCD_Init();     // Initialiser le module RC522
  Serial.println("Lecteur RFID prêt.");

  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  handleRFID();
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

  triggerAlert();

  sendUID(uid);

  mfrc522.PICC_HaltA();
}

void sendUID(String uid) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(authApiUrlRFID);
    http.addHeader("Content-Type", "application/json");
    String httpRequestData = "{\"uid\":\"" + uid + "\"}";
    Serial.println(httpRequestData);
    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);

      if (httpResponseCode == 404) {
        //mqtt publish error on topic for raspberry screen
      } else {
        //same (publish state of the door)
        //call openDoor function if door open
      }
    } else {
      Serial.print("Error in POST request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi disconnected");
  }
}

void triggerAlert() {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(200);
  digitalWrite(BUZZER_PIN, LOW);
}

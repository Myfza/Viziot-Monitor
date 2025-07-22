# IoT Device Control Dashboard

A futuristic web interface for controlling IoT devices in real-time using React, Supabase, and TailwindCSS.

## Features

- 🚀 **Real-time Control**: Control devices instantly with WebSocket connections
- 🎨 **Futuristic UI**: Dark mode with neon accents and smooth animations
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🔐 **Secure Authentication**: User authentication with Supabase Auth
- ⚡ **Live Updates**: Real-time status updates for all devices
- 🏠 **Multi-device Support**: Control multiple IoT devices from one dashboard

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Supabase (Database + Auth + Real-time)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

1. **Setup Supabase Project**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update the `.env` file with your credentials

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Database Setup**
   - The migration file will create the necessary tables
   - Run the migration in your Supabase dashboard

## ESP32 Integration

To connect your ESP32 devices, you can use this example Arduino code:

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "your-wifi-ssid";
const char* password = "your-wifi-password";
const char* supabaseUrl = "your-supabase-url";
const char* apiKey = "your-supabase-anon-key";

const int ledPin = 2; // GPIO pin for LED
String deviceId = "your-device-id";

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(supabaseUrl + "/rest/v1/devices?id=eq." + deviceId);
    http.addHeader("apikey", apiKey);
    http.addHeader("Authorization", "Bearer " + String(apiKey));
    
    int httpResponseCode = http.GET();
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      
      // Parse JSON response
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, response);
      
      if (doc.size() > 0) {
        bool status = doc[0]["status"];
        digitalWrite(ledPin, status ? HIGH : LOW);
        Serial.println("Device status: " + String(status ? "ON" : "OFF"));
      }
    }
    
    http.end();
  }
  
  delay(1000); // Check status every second
}
```

## Device Types Supported

- **LED**: Light controls
- **Motor**: Fans, pumps, motors
- **Relay**: General switching
- **Camera**: Surveillance cameras
- **Sensor**: Temperature, humidity, etc.

## API Endpoints

The dashboard uses Supabase's built-in REST API:

- `GET /devices` - Fetch all user devices
- `POST /devices` - Add new device
- `PATCH /devices` - Update device status
- `DELETE /devices` - Remove device

## Real-time Features

- Live device status updates
- Instant toggle response
- Connection status monitoring
- Multi-user support with row-level security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
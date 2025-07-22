import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Code, Wifi, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export const DeviceCodeSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<'esp32' | 'arduino' | 'javascript'>('esp32')

  const codeExamples = {
    esp32: {
      title: 'ESP32 Arduino Code',
      language: 'cpp',
      code: `#include <WiFi.h>
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
}`
    },
    arduino: {
      title: 'Arduino Uno with WiFi Shield',
      language: 'cpp',
      code: `#include <WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>

char ssid[] = "your-wifi-ssid";
char pass[] = "your-wifi-password";

WiFiClient wifi;
HttpClient client = HttpClient(wifi, "your-supabase-url", 443);

const int ledPin = 13;
String deviceId = "your-device-id";

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Connecting to WiFi...");
    WiFi.begin(ssid, pass);
    delay(10000);
  }
  
  Serial.println("Connected to WiFi");
}

void loop() {
  String path = "/rest/v1/devices?id=eq." + deviceId;
  
  client.beginRequest();
  client.get(path);
  client.sendHeader("apikey", "your-supabase-anon-key");
  client.sendHeader("Authorization", "Bearer your-supabase-anon-key");
  client.endRequest();
  
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  
  if (statusCode == 200) {
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, response);
    
    if (doc.size() > 0) {
      bool status = doc[0]["status"];
      digitalWrite(ledPin, status ? HIGH : LOW);
      Serial.println(status ? "LED ON" : "LED OFF");
    }
  }
  
  delay(2000);
}`
    },
    javascript: {
      title: 'JavaScript/Node.js Client',
      language: 'javascript',
      code: `const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

class IoTDevice {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.isConnected = false;
  }

  async connect() {
    try {
      // Subscribe to real-time changes
      const channel = supabase
        .channel('device-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'devices',
            filter: \`id=eq.\${this.deviceId}\`
          },
          (payload) => {
            this.handleDeviceUpdate(payload.new);
          }
        )
        .subscribe();

      this.isConnected = true;
      console.log('Connected to IoT Dashboard');
      
      // Initial status check
      await this.checkDeviceStatus();
      
    } catch (error) {
      console.error('Connection failed:', error);
    }
  }

  async checkDeviceStatus() {
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('status')
        .eq('id', this.deviceId)
        .single();

      if (error) throw error;
      
      this.handleDeviceUpdate(data);
    } catch (error) {
      console.error('Status check failed:', error);
    }
  }

  handleDeviceUpdate(device) {
    console.log(\`Device \${device.status ? 'ON' : 'OFF'}\`);
    // Implement your device control logic here
    this.controlDevice(device.status);
  }

  controlDevice(status) {
    // Your device control implementation
    if (status) {
      console.log('Turning device ON');
      // GPIO.write(pin, 1);
    } else {
      console.log('Turning device OFF');
      // GPIO.write(pin, 0);
    }
  }
}

// Usage
const device = new IoTDevice('your-device-id');
device.connect();`
    }
  }

  const copyToClipboard = async (code: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(platform)
      toast.success('Code copied to clipboard!', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FB923C',
        },
      })
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const platforms = [
    { key: 'esp32', label: 'ESP32', icon: Zap },
    { key: 'arduino', label: 'Arduino', icon: Wifi },
    { key: 'javascript', label: 'JavaScript', icon: Code }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Device Integration Code</h3>
          <p className="text-gray-400">Connect your devices to the IoT dashboard</p>
        </div>
        <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl">
          <Code className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Platform Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {platforms.map((platform) => {
          const IconComponent = platform.icon
          return (
            <motion.button
              key={platform.key}
              onClick={() => setSelectedPlatform(platform.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                selectedPlatform === platform.key
                  ? 'bg-orange-400 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconComponent className="w-4 h-4" />
              <span>{platform.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Code Display */}
      <div className="relative">
        <div className="flex items-center justify-between bg-gray-900/50 px-4 py-3 rounded-t-lg border-b border-gray-600">
          <h4 className="text-white font-medium">{codeExamples[selectedPlatform].title}</h4>
          <motion.button
            onClick={() => copyToClipboard(codeExamples[selectedPlatform].code, selectedPlatform)}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700/50 text-gray-300 rounded-md hover:bg-gray-600/50 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copiedCode === selectedPlatform ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>
        
        <div className="bg-gray-900/80 rounded-b-lg overflow-hidden">
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
            <code>{codeExamples[selectedPlatform].code}</code>
          </pre>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 p-4 bg-orange-400/10 border border-orange-400/30 rounded-lg">
        <h5 className="text-orange-400 font-semibold mb-2">Setup Instructions:</h5>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>1. Replace placeholder values with your actual credentials</li>
          <li>2. Install required libraries for your platform</li>
          <li>3. Upload the code to your device</li>
          <li>4. Monitor device status in the dashboard</li>
        </ul>
      </div>
    </motion.div>
  )
}
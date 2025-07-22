# VizioT Monitor – Smart IoT Monitoring Platform

Monitor, analyze, and control your IoT devices with **real-time data visualization**, intelligent alerts, and full remote access — from anywhere in the world.

---

##  Overview

**IoT Monitor** is a full-stack web application built to simplify how you manage and understand your smart devices. Whether you're tracking temperature or monitoring air quality, IoT Monitor gives you instant insights with a beautiful dashboard and seamless device integration.

---

##  Features
  
-  Dynamic charts and data tables per device  
-  Device control panel (ON/OFF, toggle)  
-  Historical sensor data with charting  
-  Smart alerts (based on threshold/rules)  
-  Global access (mobile and desktop)  
-  Secure login with Supabase Auth  
-  Dark mode UI (optional)  

---

##  Supported Sensor Types

-  **Temperature**
-  **Humidity**
-  **Pressure**
-  **Light Intensity**
-  **Air Quality** (e.g., CO₂, PM2.5, VOC)

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/iot-monitor.git
cd iot-monitor

npm install
# or
yarn install

VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-key
VITE_MQTT_BROKER_URL=wss://broker.hivemq.com:8884/mqtt
VITE_APP_NAME=IoT Monitor

npm run dev


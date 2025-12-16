import { Platform } from 'react-native';

// For Physical Devices (iOS/Android), use your computer's LAN IP.
// Update this IP if your computer's IP changes.
const LAN_IP = '192.168.1.104';

export const API_URL =
    Platform.OS === 'web' ? 'http://localhost:3000/api' :
        Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' :
            `http://${LAN_IP}:3000/api`;

// Fallback local for web/iOS Simulator if needed, but LAN IP works for those too usually.
// If you are using iOS Simulator, localhost is fine: 'http://localhost:3000/api'

import { getToken } from './tokenRefresh';

const BASE_URL = 'ws://localhost:8008';

export const connectToSession = (sessionId: string): Promise<WebSocket> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const wsUrl = `${BASE_URL}/ws/student/session/${sessionId}/?Authorization=${token}`;
      console.log('Attempting to connect to WebSocket:', wsUrl);
      console.log('Session ID:', sessionId);
      console.log('Token length:', token.length);

      const ws = new WebSocket(wsUrl);

      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        ws.close();
        reject(new Error('WebSocket connection timeout'));
      }, 5000); // 5 seconds timeout

      ws.onopen = () => {
        console.log('WebSocket Connected successfully');
        clearTimeout(connectionTimeout);
        resolve(ws);
      };

      ws.onerror = (error: Event) => {
        console.error('WebSocket Error:', error);
        clearTimeout(connectionTimeout);
        reject(new Error('WebSocket connection failed: Server error (500)'));
      };

      ws.onclose = (event) => {
        console.log('WebSocket Disconnected:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          timestamp: new Date().toISOString()
        });
        clearTimeout(connectionTimeout);
        
        if (event.code === 1006) {
          reject(new Error('Server rejected the connection. Please check if the session ID is valid and the server is running correctly.'));
        } else if (!event.wasClean) {
          reject(new Error(`WebSocket connection closed unexpectedly with code ${event.code}`));
        }
      };

      return ws;
    } catch (error) {
      console.error('WebSocket setup error:', error);
      reject(error);
    }
  });
}; 
## WebSockets
Websockets is a communication protoocol just like HTTTP. It establishes a permanent connection until disconnected and doesnot establish a connection for each request like HTTP.
Here I have built a multiplayer dashboard and implemented CRUD operations using WebSockets.
I have used Socket.IO to implement Websockets. The main advantage of using Socket.IO is its features like:
# HTTP long polling fallback:
  The connection fallbacks to HTTP long polling if WebSockets connection cannot be established.
# Automatic Reconnection:
  Websockets has a hearbeat mechanism, and checks the status of connection. If client connection is disconnected, it automatically reconnects the connection and vice versa.
# Packet Buffering:
  If connection is disconnect, the packets are buffered and send when the connection is re-established.

# Applications
Real time usage where no latency is required. Example: A multiplayer dashboard, Chat Application, etc

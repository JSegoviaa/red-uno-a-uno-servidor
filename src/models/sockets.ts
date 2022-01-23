import { Server } from 'socket.io';

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('cliente conectado');
    });
  }
}

export default Sockets;

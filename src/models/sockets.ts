import { Server } from 'socket.io';
import { comprobarJWT } from '../helpers/generarJWT';

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      if (!valido) {
        console.log('socket no identifacdo');
        return socket.disconnect();
      }

      console.log('cliente conectado', uid);

      socket.on('disconnect', () => {
        console.log('cliente desconectado');
      });
    });
  }
}

export default Sockets;

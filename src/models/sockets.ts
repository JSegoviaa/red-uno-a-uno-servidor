import { Server } from 'socket.io';
import { guardarMensaje, usuarioConectado, usuarioDesconectado } from '../controllers/sockets';
import { comprobarJWT } from '../helpers/generarJWT';

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      if (!valido) {
        console.log('socket no identifacdo');

        return socket.disconnect();
      }

      await usuarioConectado(uid);

      socket.join(uid);

      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await guardarMensaje(payload);
        this.io.to(payload.para).emit('mensaje-personal', mensaje);
        this.io.to(payload.remitente).emit('mensaje-personal', mensaje);
      });

      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

export default Sockets;

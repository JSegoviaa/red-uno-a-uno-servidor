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

      socket.on('nueva-notificacion', async (notificacion) => {
        console.log(notificacion);
        this.io.to(notificacion.para).emit('obtener-notificacion', {
          de: notificacion.remitente,
          mensaje: notificacion.mensaje,
          nombre: notificacion.nombre,
          apellido: notificacion.apellido,
        });
      });

      socket.on('solicitud', ({ solicitud }) => {
        this.io.to(solicitud.propietario).emit('obtener-solicitud', solicitud);
      });

      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

export default Sockets;

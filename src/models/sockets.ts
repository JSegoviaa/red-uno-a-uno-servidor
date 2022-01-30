import { Server } from 'socket.io';
import { usuarioConectado, usuarioDesconectado } from '../controllers/sockets';
import { comprobarJWT } from '../helpers/generarJWT';

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    let users: any = [];

    const addUser = (uid: string, sid: string) => {
      !users.some((usuario: any) => usuario.uid === uid && users.push({ uid, sid }));
    };

    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      if (!valido) {
        console.log('socket no identifacdo');

        return socket.disconnect();
      }

      await usuarioConectado(uid);

      socket.on('agregar-usuario', (uid) => {
        addUser(uid, socket.id);
        socket.emit('mostrar-usuarios', users);
      });

      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

export default Sockets;

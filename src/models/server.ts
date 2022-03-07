import http from 'http';
import express, { Application } from 'express';
import cors from 'cors';
import { Server as ServerIo } from 'socket.io';
import rutasUsuario from '../routes/usuarios';
import auth from '../routes/auth';
import categorias from '../routes/categorias';
import chats from '../routes/chats';
import correos from '../routes/correos';
import favoritos from '../routes/favoritos';
import inmuebles from '../routes/inmuebles';
import historial from '../routes/historial';
import mensajes from '../routes/mensajes';
import paquetes from '../routes/paquetes';
import pedidos from '../routes/pedido';
import referencias from '../routes/referencias';
import tipoPropiedad from '../routes/tipoPropiedad';
import solicitud from '../routes/solicitud';
import subidas from '../routes/subidas';
import { dbConnection } from '../database/config';
import Sockets from './sockets';

class Server {
  private app: Application;
  private puerto: string;
  private server: http.Server;
  private io: ServerIo;
  private rutas = {
    auth: '/api/auth/',
    categorias: '/api/categorias/',
    chats: '/api/chats/',
    correos: '/api/correos/',
    favoritos: '/api/favoritos/',
    inmuebles: '/api/inmuebles/',
    historial: '/api/historial/',
    mensajes: '/api/mensajes/',
    paquetes: '/api/paquetes/',
    pedidos: '/api/pedidos/',
    referencias: '/api/referencias/',
    solicitud: '/api/solicitud/',
    subidas: '/api/subidas/',
    tipoPropiedad: '/api/tipo-de-propiedad/',
    usuarios: '/api/usuarios/',
    usuariosPagados: '/api/usuarios-pagados/',
  };

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || '8000';

    //Servidor de sockets
    this.server = http.createServer(this.app);
    this.io = new ServerIo(this.server);

    //Conexión a la base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    //Rutas de la aplicación
    this.routes();

    //Sockets
    this.configurarSockets();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura del body
    this.app.use(express.json());

    //Carpeta pública
    this.app.use(express.static('src/public'));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  routes() {
    this.app.use(this.rutas.auth, auth);
    this.app.use(this.rutas.categorias, categorias);
    this.app.use(this.rutas.chats, chats);
    this.app.use(this.rutas.solicitud, solicitud);
    this.app.use(this.rutas.correos, correos);
    this.app.use(this.rutas.favoritos, favoritos);
    this.app.use(this.rutas.inmuebles, inmuebles);
    this.app.use(this.rutas.historial, historial);
    this.app.use(this.rutas.mensajes, mensajes);
    this.app.use(this.rutas.paquetes, paquetes);
    this.app.use(this.rutas.pedidos, pedidos);
    this.app.use(this.rutas.referencias, referencias);
    this.app.use(this.rutas.tipoPropiedad, tipoPropiedad);
    this.app.use(this.rutas.usuarios, rutasUsuario);
    this.app.use(this.rutas.subidas, subidas);
  }

  listen() {
    this.server.listen(this.puerto, () => {
      console.log(`Servidor en línea en el puerto ${this.puerto}`);
    });
  }
}

export default Server;

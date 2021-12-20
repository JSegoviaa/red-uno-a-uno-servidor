import express, { Application } from 'express';
import cors from 'cors';
import rutasUsuario from '../routes/usuarios';
import auth from '../routes/auth';
import { dbConnection } from '../database/config';

class Server {
  private app: Application;
  private puerto: string;
  private rutas = {
    auth: '/api/auth/',
    usuarios: '/api/usuarios/',
  };

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || '8000';

    //Conexión a la base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    //Rutas de la aplicación
    this.routes();
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

  routes() {
    this.app.use(this.rutas.auth, auth);
    this.app.use(this.rutas.usuarios, rutasUsuario);
  }

  listen() {
    this.app.listen(this.puerto, () => {
      console.log(`Servidor en línea en el puerto ${this.puerto}`);
    });
  }
}

export default Server;

import express, { Application } from 'express';
import cors from 'cors';
import rutasUsuario from '../routes/usuarios';

class Server {
  private app: Application;
  private puerto: string;
  private rutas = {
    usuarios: 'api/usuarios/',
  };

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || '8000';

    //middlewares
    this.middlewares();

    //Rutas de la aplicación
    this.routes();
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
    this.app.use(this.rutas.usuarios, rutasUsuario);
  }

  listen() {
    this.app.listen(this.puerto, () => {
      console.log(`Servidor en línea en el puerto ${this.puerto}`);
    });
  }
}

export default Server;

import express, { Application } from "express";
import cors from "cors";
import { Socket } from "socket.io";
import rutasUsuario from "../routes/usuarios";
import auth from "../routes/auth";
import categorias from "../routes/categorias";
import chats from "../routes/chats";
import correos from "../routes/correos";
import favoritos from "../routes/favoritos";
import inmuebles from "../routes/inmuebles";
import historial from "../routes/historial";
import tipoPropiedad from "../routes/tipoPropiedad";
import subidas from "../routes/subidas";
import { dbConnection } from "../database/config";

class Server {
  private app: Application;
  private puerto: string;
  private rutas = {
    auth: "/api/auth/",
    categorias: "/api/categorias/",
    chats: "/api/chats/",
    correos: "/api/correos/",
    favoritos: "/api/favoritos/",
    inmuebles: "/api/inmuebles/",
    historial: "/api/historial/",
    subidas: "/api/subidas/",
    tipoPropiedad: "/api/tipo-de-propiedad/",
    usuarios: "/api/usuarios/",
  };

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || "8000";

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
    this.app.use(express.static("src/public"));
  }

  routes() {
    this.app.use(this.rutas.auth, auth);
    this.app.use(this.rutas.categorias, categorias);
    this.app.use(this.rutas.chats, chats);
    this.app.use(this.rutas.correos, correos);
    this.app.use(this.rutas.favoritos, favoritos);
    this.app.use(this.rutas.inmuebles, inmuebles);
    this.app.use(this.rutas.historial, historial);
    this.app.use(this.rutas.tipoPropiedad, tipoPropiedad);
    this.app.use(this.rutas.usuarios, rutasUsuario);
    this.app.use(this.rutas.subidas, subidas);
  }

  listen() {
    this.app.listen(this.puerto, () => {
      console.log(`Servidor en línea en el puerto ${this.puerto}`);
    });
  }
}

export default Server;

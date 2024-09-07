import express from "express";
import path from "path";
import upload from "./utils/multer.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { connectDB } from "./config/index.js";
import routerApp from './router/index.js'
import{helpers} from './helpers.js'
import { fileURLToPath } from 'url';






const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});

export const socketServer = new Server(httpServer);



socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
  
  
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});



//conexion a base de datos mongo
connectDB()





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(routerApp);


app.engine("handlebars", handlebars.engine({
  
  defaultLayout: 'main',
  helpers,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname,"views"));



app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).send("no se encontro la ruta");
});


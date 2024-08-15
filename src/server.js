import express from "express";
import path from "path";
//import userRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.router.js";
import upload from "./utils/multer.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";




const app = express();
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



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

//configuracion del motor de plantillas
app.engine("handlebars", handlebars.engine());
//configuracion de la carpeta donde obtiene las plantillas0
app.set("views", path.resolve("src/views"));
//extension de las plantillas
app.set("view engine", "handlebars");

app.post("/", upload.single("myFile"), (req, res) => {
  res.send("archivo subido");
});

app.use("/", viewRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
//app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).send("no se encontro la ruta");
});
/*
app.listen(port, (req, res) => {
  console.log(`escuchando en el puerto ${port}`);
});
*/

import express from "express";
import path from "path";
import userRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import upload from "./utils/multer.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.resolve("src/public")));
/*
app.use(function (req, res, next) {
  console.log("time:", Date.now());
  next();
});*/

app.post("/", upload.single("myFile"), (req, res) => {
  res.send("archivo subido");
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).send("no se encontro la ruta");
});

app.listen(port, (req, res) => {
  console.log(`escuchando en el puerto ${port}`);
});

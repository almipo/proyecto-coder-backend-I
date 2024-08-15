import { Router } from "express";
import productManager from "../managers/FileSystem/products.manager.js";
import {socketServer} from '../server.js';


const router = Router();
const { getProducts, createProducts, deleteProduct } = new productManager();

router.get("/", async (req, res) => {
  try {
    const productsDb = await getProducts();

    res.render("home", { title1: "HOME", productsDb, style: "styles.css" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const productsDb = await getProducts();
    res.render("realTimeProducts", {
      title1: "PRODUCTOS",
      title2: "PRODUCTOS",
      productsDb,
      style: "styles2.css",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
 
    const { title, description, precio, code, stock } = req.body;
    const thumbnail = req.file ? req.file.filename : null;
    const newProduct = await createProducts(
      title,
      description,
      precio,
      thumbnail,
      code,
      stock
    );


    if (newProduct === code) {
      const productsDb = await getProducts();
     res.render("realtimeProducts", {
        title1: "codigo repetido",
        title2: "PRODUCTOS",
        style: "styles2.css",
        class: "error",
        message: `El codigo ${code} ya existe`,
        title,
        description,
        precio,
        thumbnail,
        code,
        stock,
        productsDb
      });
    }
    else{
      const productsDb = await getProducts();
      res.render("realtimeProducts", {
        title1: "PRODUCTOS",
        title2: "PRODUCTOS",
        style: "styles2.css",
        class: "success",
        message: `Producto ${title} creado con éxito`,
        productsDb
      });
    }
    
 
    
   
    const productsDb = await getProducts();
    socketServer.emit("updateProducts", productsDb);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el producto");
  }
});




router.delete("/realtimeproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;  
    await deleteProduct(id);  
    const productsDb = await getProducts();  
    
  
    socketServer.emit("updateProducts", productsDb); 
    
    res.status(200).send({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error al eliminar el producto");
  }
});
  



  

export default router;


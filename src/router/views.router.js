import { Router } from "express";
import { 
  getProductsView, 
  getProductDetailView, 
  getRealTimeProducts, 
  postRealTimeProducts, 
  deleteRealTimeProducts, 
  getUserById,
  addProductToCartView,
  removeProductFromCartView,
  updateProductInCartView,
  createUser, 
  getUsers, 
  getUserCreateView,
    createCartView ,
    getProductsCartView,updateCartView,clearCartView
} from "../controllers/view.controller.js";

import { socketServer } from '../server.js';

const router = Router();

// Rutas para productos
router.get("/", getProductsView);

router.get("/products/:pid", getProductDetailView);
router.get("/realtimeproducts", getRealTimeProducts);
router.post("/realtimeproducts", postRealTimeProducts);
router.delete("/realtimeproducts/:id", deleteRealTimeProducts);

// Rutas para carrito
//router.post("/cart", createCartView);
router.get("/cart/:cid", getProductsCartView);
//router.post("/cart/:cid/products/:pid", addProductToCartView);
router.delete("api/cart/:cid/products/:pid", removeProductFromCartView);
router.put("api/cart/:cid/products/:pid", updateProductInCartView);
router.put('api/cart/:cid', updateCartView);
router.delete('api/cart/:cid', clearCartView);

// Rutas para usuarios
//router.get("/user/:uid", getUserById); 
//router.get("/user", getUsers);
router.post("/user/create", createUser);
router.get("/user/create", getUserCreateView);

export default router;

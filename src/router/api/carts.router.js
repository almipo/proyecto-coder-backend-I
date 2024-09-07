import { Router } from "express";
import CartDaosMongo from "../../daos/mongo/cartDaos.mongo.js";

const router = Router();
const cartService = new CartDaosMongo();

router.post("/", async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send("Error al crear el carrito.");
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al obtener el carrito.");
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addProductToCart(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al agregar producto al carrito.");
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.removeProductFromCart(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al eliminar producto del carrito.");
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const productsArray = req.body.products; // Expecting an array of product IDs
    const cart = await cartService.updateCart(cid, productsArray);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al actualizar el carrito.");
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateProductQuantity(cid, pid, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al actualizar la cantidad del producto.");
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.clearCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Error al eliminar todos los productos del carrito.");
  }
});

export default router;

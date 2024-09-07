import { Router } from "express";
import userRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartRouter from "./api/carts.router.js";
import viewRouter from "./views.router.js";


const router = Router();

router.use("/", viewRouter);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartRouter);
router.use("/api/users", userRouter);

export default router;
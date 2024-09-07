import { Router } from "express";
import userModel from "../../daos/mongo/models/users.model.js"


const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ data: users });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      return res.status(400).send({ message: "Falta email o contraseña" });
    }
    const newUser = await userModel.create(body);
    const newCart = await cartService.createCart();
    newUser.cart = newCart._id;
    await newUser.save();
    res.status(200).send({ data: newUser });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { body } = req;
    if (!body.email || !body.firstName) {
      return res.status(400).send({ status: "error", error: "falta data" });
    }

    const user = await userModel.findByIdAndUpdate;
    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findByIdAndDelete(uid);
    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
});
export default router;

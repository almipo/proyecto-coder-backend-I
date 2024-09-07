import { Router } from "express";

import productsDaosMongo from "../../daos/mongo/productsDaos.mongo.js";


const router = Router();
const productService = new productsDaosMongo




router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const options = {};
    if (query) {
      // Convertimos parámetros de query para búsqueda
      if (query.stock) options.stock = Number(query.stock);
      if (query.price) options.price = Number(query.price);
      if (query.category) options.category = query.category;
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.price = sort === 'asc' ? 1 : -1;
    }

    const totalProducts = await productService.getProducts(options);
    const totalPages = Math.ceil(totalProducts.length / limit);

    const products = await productService.getProducts(options, {
      limit: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      sort: sortOptions
    });

    const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
    const nextPage = Number(page) < totalPages ? Number(page) + 1 : null;

    res.send({
      status: "success",
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: Number(page),
      hasPrevPage: prevPage !== null,
      hasNextPage: nextPage !== null,
      prevLink: prevPage ? `/api/products?limit=${limit}&page=${prevPage}${sort ? `&sort=${sort}` : ''}` : null,
      nextLink: nextPage ? `/api/products?limit=${limit}&page=${nextPage}${sort ? `&sort=${sort}` : ''}` : null
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", message: "Error al obtener los productos" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { body } = req;
    if (
      !body.name ||
      !body.description ||
      !body.price ||
      !body.thumbnail ||
      !body.code ||
      !body.stock ||
      !body.category
    ) {
      res.status(400).send({ status: "error", message: "faltan datos" });
      return;
    }
    const existingProduct = await productService.getProduct({ code: body.code });
    if (existingProduct) {
      return res
        .status(400)
        .send({ status: "error", message: "El código del producto ya existe" });
    }
    const response = await productService.createProducts(body);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { filter, update } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!filter || !update) {
      return res
        .status(400)
        .send({
          status: "error",
          message: "Faltan datos de identificación o actualización",
        });
    }

    const products = await productService.updateProducts(filter, update);

    if (products) {
      res.send({ status: "success", data: products });
    } else {
      res
        .status(404)
        .send({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", message: "Error al actualizar el producto" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const options = req.query; // Obtener las opciones del cuerpo de la solicitud

    // Verificar que el cuerpo de la solicitud contenga al menos un filtro
    if (Object.keys(options).length === 0) {
      return res
        .status(400)
        .send({ status: "error", message: "Faltan opciones para eliminar" });
    }

    // Llamar al método deleteProducts desde el servicio (productService)
    const deletedProduct = await productService.deleteProducts(options);

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ status: "error", message: "Producto no encontrado" });
    }

    res.send({ status: "success", data: deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al eliminar el producto");
  }
});

router.get("/filter", async (req, res) => {
  try {
    const filter = req.query; // Obtiene los parámetros de consulta

    //convierte stock y precio a number para hace rla busqueda en bd
    if (filter.stock) {
      filter.stock = Number(filter.stock);
    }
    if (filter.price) {
      filter.price = Number(filter.price);
    }

    if (Object.keys(filter).length === 0) {
      return res
        .status(400)
        .send({
          status: "error",
          message: "No se ha proporcionado ningún filtro",
        });
    }

    const product = await productService.getProduct(filter);

    if (product) {
      res.send({ status: "success", data: product });
    } else {
      res
        .status(404)
        .send({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", message: "Error al obtener el producto" });
  }
});

export default router;

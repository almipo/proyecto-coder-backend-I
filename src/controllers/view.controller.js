import productsDaosMongo from "../daos/mongo/productsDaos.mongo.js";
import cartDaosMongo from "../daos/mongo/cartDaos.mongo.js";
import userDaosMongo from "../daos/mongo/userDaos.mongo.js"
import {socketServer} from '../server.js';

const productService = new productsDaosMongo();
const cartService = new cartDaosMongo();
const userService = new userDaosMongo();








export const getProductsView = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, filterBy, minPrice, maxPrice } = req.query;
    let filterOptions = {};

    if (filterBy === 'price') {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

 
      if (!isNaN(min) && !isNaN(max)) {
        filterOptions.price = { $gte: min, $lte: max };
      }
    } else if (filterBy) {
      filterOptions[filterBy] = new RegExp(req.query.filterValue, 'i'); // Insensible a mayúsculas
    }

    const sortOptions = {};
    if (sort) {
      sortOptions.price = sort === 'asc' ? 1 : -1;
    }

    const totalProducts = await productService.getProducts(filterOptions);
    const totalPages = Math.ceil(totalProducts.length / limit);

    const products = await productService.getProducts(filterOptions, {
      limit: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      sort: sortOptions
    });

    const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
    const nextPage = Number(page) < totalPages ? Number(page) + 1 : null;

    res.render("index", {
      title1: "Lista de Productos",
      productsDb: products,
      style: "styles.css",
      limit: Number(limit),
      page: Number(page),
      prevPage,
      nextPage,
      sort,
      currentFilter: filterBy || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || ''
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener productos.");
  }
};
export const getProductDetailView = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProduct(pid);
    
    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }
    
    res.render("productsDetail", {
      title1: "Detalles del Producto",
      description: product.description,
      price: product.price,
      code: product.code,
      category: product.category,
      stock: product.stock,
      id: product._id,
      cartId: req.query.cartId || null
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los detalles del producto.");
  }
};


export const getRealTimeProducts = async (req, res) => {
  try {
    const productsDb = await productService;
    res.render("realTimeProducts", {
      title1: "PRODUCTOS",
      title2: "PRODUCTOS",
      productsDb,
      style: "styles2.css",
    });
  } catch (error) {
    console.log(error);
  }
};



export const postRealTimeProducts =async (req, res) => {
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
  }
  catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).send("Error al crear el producto");
  }}


  export const deleteRealTimeProducts= async (req, res) => {
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
  };

  
  // Crear un nuevo usuario
  export const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      // Llama al servicio para crear el nuevo usuario
     
      await userService.createUser({ firstName, lastName, email });
      res.redirect('/users'); // Redirige a la lista de usuarios
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear el usuario.');
    }
  };
  
  // Obtener todos los usuarios
  export const getUsers = async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.render("usersList", { users }); 
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error al obtener usuarios');
    }
  };
  
  // Obtener un usuario por ID
  export const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId); 
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).send('Error al obtener usuario');
    }
  };
  // Actualizar un usuario por ID
  export const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body; 
      const updatedUser = await userService.updateUser(userId, updateData);
      if (!updatedUser) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).send('Error al actualizar usuario');
    }
  };
  
  // Eliminar un usuario por ID
  export const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await userService.deleteUser(userId);
      if (!deletedUser) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).send('Usuario eliminado');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).send('Error al eliminar usuario');
    }
  };
  export const getUserCreateView = (req, res) => {
    try {
      res.render("userCreate", {
        title1: "Crear Usuario"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al cargar la vista de creación de usuario.');
    }
  };

  
  export const getProductsCartView = async (req, res) => {
    try {
      const cartId = req.params.cid
  
      if (!cartId) {
        console.log("id carrito no proporcionado")
        return res.status(400).send('ID de carrito no proporcionado.');
      }
  
      const cart = await cartService.getCartById(cartId)
      if (!cart) {
        return res.status(404).send('Carrito no encontrado.');
      }
  
      res.render('cartDetail', {
        title1: "Vista del Carrito",
        productsDb: cart.products,
        cartId,
      });
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
      res.status(500).send('Error al obtener productos del carrito.');
    }
  };
  
  export const createCartView = async (req, res) => {
    try {
      const { code, products, userId } = req.body; 
  
      if (!code || !userId) {
        return res.status(400).send("El campo 'code' y 'userId' son obligatorios.");
      }
  
      const newCart = { code, products, userId };
      const cart = await cartService.createCart(newCart);
  
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      res.status(500).send('Error al crear el carrito.');
    }
  };
  
  // Agregar un producto al carrito
  export const addProductToCartView = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).send("Error al agregar producto al carrito.");
    }
  };
  
  // Eliminar un producto del carrito
  export const removeProductFromCartView = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.removeProductFromCart(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).send("Error al eliminar producto del carrito.");
    }
  };
  
  // Actualizar la cantidad de un producto en el carrito
  export const updateProductInCartView = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).send("Error al actualizar la cantidad del producto.");
    }
  };
  
  // Eliminar todos los productos de un carrito
  export const clearCartView = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.clearCart(cid); 
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      res.status(500).send('Error al eliminar todos los productos del carrito.');
    }
  };
  export const updateCartView = async (req, res) => {
    try {
      const cartId = req.session.cartId || req.params.cid; // Usa el ID del carrito desde la sesión si está disponible
      const { products } = req.body;
  
      if (!products || !Array.isArray(products)) {
        return res.status(400).send("El campo 'products' debe ser un arreglo.");
      }
  
      const updatedCart = await cartService.updateCart(cartId, products);
  
      if (!updatedCart) {
        return res.status(404).send('Carrito no encontrado.');
      }
  
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      res.status(500).send('Error al actualizar el carrito.');
    }
  };
  
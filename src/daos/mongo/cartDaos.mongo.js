import cartModel from "../mongo/models/carts.model.js";

class CartDaosMongo {
  constructor() {
    this.cartModel = cartModel;
  }

  // Crear un nuevo carrito
  async createCart(cartData) {
    try {
      const newCart = await this.cartModel.create(cartData);
      return newCart;
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      throw new Error('Error al crear el carrito');
    }
  }

  // Obtener un carrito por ID
  async getCartById(cartId) {
    try {
      // Utiliza populate directamente en la consulta
      return await this.cartModel.findById(cartId).populate('products.product').exec();
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al agregar producto al carrito');
    }
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al eliminar producto del carrito');
    }
  }

  // Actualizar todos los productos del carrito
  async updateCart(cartId, productsArray) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      cart.products = productsArray;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  // Actualizar la cantidad de un producto específico en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw new Error('Error al actualizar la cantidad del producto');
    }
  }

  // Limpiar todos los productos del carrito
  async clearCart(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al eliminar todos los productos del carrito');
    }
  }
}

export default CartDaosMongo;

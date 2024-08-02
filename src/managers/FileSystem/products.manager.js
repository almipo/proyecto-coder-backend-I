import fs from 'fs';


const path = './dbjson/productsDb.json';

class productManager {
  constructor() {
    this.path = path;
  }

  readProducts = async () => {
    if (fs.existsSync(this.path)) {
      const productsJson = await fs.promises.readFile(this.path, 'utf-8');
      const productsJs = JSON.parse(productsJson);
      return productsJs;
    }
    return [];
  }

  getProducts = async () => {
    try {
      const products = await this.readProducts();
      return products;
    } catch (error) {
      console.log("error", error);
    }
  }

  getProduct = async (id) => {
    try {
      const products = await this.readProducts();
      const product = products.find(p => p.id === parseInt(id))
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  createProducts = async (title, description, precio, thumbnail, code, stock)=>{
    try{
        
        
        const products = await this.readProducts();
        
       
        
        const state="true"
        

        const product = {
            id:products.length === 0 ? 1 : products[products.length - 1].id + 1,
            title,
            description,
            precio,
            status: state,
            thumbnail,
            code,
            stock
        };
        
        let repeatCode=products.some(p => p.code === code);

        if (repeatCode){
            return "el codigo ya existe"
        }
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
        return product;
    }
    catch(error){
        console.log(error)
    }
}

  updateProducts = async (id,title, description, precio, thumbnail, code, stock ) => {
    try {
      const products = await this.readProducts();
      const productIndex = products.findIndex(product => product.id === parseInt(id));

      if (productIndex === -1) {
        return "producto no encontrado";
      } else {
        const product = products[productIndex];
        const updatedData = {
          title: title || product.title,
          description: description || product.description,
          precio: precio || product.precio,
          thumbnail: thumbnail || product.thumbnail,
          code: code || product.code,
          stock: stock || product.stock
        };
        Object.assign(product, updatedData);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteProduct = async (id) => {
    try {
      const products = await this.readProducts();
      
      const productIndex = products.findIndex(product => product.id === parseInt(id));

      if (productIndex ===-1) {
        return "producto no encontrado";
      } else {
       products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default productManager;
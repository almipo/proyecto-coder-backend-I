import fs from 'fs';

const path = './dbjson/cartDb.json';


class cartManager{
    constructor(){
        this.path = path
    }

    readCart=async()=>{
        if (fs.existsSync(this.path)){
        const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
        const cartsJs = JSON.parse(cartsJson);
        return cartsJs;
      }
     
      return [];
    }

    getCartById = async(cid)=> {
        try {
            const carts = await this.readCart();
            const cart = carts.find(c => c.cid === parseInt(cid));
            return cart;
          } catch (error) {
            console.log(error);
          }
    }

    createCart = async()=>{
        try{
            const carts = await this.readCart();
            const cart = {
                cid: carts.length + 1,
                products:[ ]
            }
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
            return cart
        }
        catch(error){
            console.log(error)
        }
    }

   
    createProductToCart= async(idC, idP)=>{
        try{
            const carts = await this.readCart();
            const cart = carts.find(c => c.cid === parseInt(idC));
            const productId = parseInt(idP);
    
            const existingProduct = cart.products.find(p => p.pid === productId);
    
            if (existingProduct) {
                // Si el producto ya existe, incrementa la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no existe, agrégalo al carrito
                cart.products.push({
                    pid: productId,
                    quantity: 1
                });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cart;
        }
        catch(error){
            console.log(error)
        }
    }

}

export default cartManager


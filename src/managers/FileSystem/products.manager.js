
import fs from 'fs'

const path='./dbjson/productsDb.json';




class productManager{

    constructor(){
        this.path = path;
    }
    

    readProducts=async()=>{
       if(fs.existsSync(path)){
            const productsJson=await fs.promises.readFile (path, 'utf-8');
            const productsJs=JSON.parse(productsJson);
            return productsJs;
        }
        return[];
    }


    getproducts= async()=>{
        try{
        const products=await this.readProducts; 
        return products;   
        }
        catch(error){
            console.log("error")
        }
        
    }
    

    createProducts = async newProduct=>{
        try{
            
            const products = await this.readProducts();
            
            if (products.length===0){
                newProduct.id=1;
            }
            else{
                newProduct.id=products[products.length-1].id+1;
            }
            const product = {
                id:newProduct.id,
                title: newProduct.title,
                description: newProduct.description,
                precio: newProduct.precio,
                thumbnail: newProduct.thumbnail,
                code: newProduct.code,
                stock: newProduct.stock
            };
            
            let repeatCode=products.some(product => product.code === newProduct.code);

            if (repeatCode){
                return "el codigo ya existe"
            }
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
            return newProduct;
        }
        catch(error){
            console.log(error)
        }
    }


    updateProducts=async(id)=>{
        try{
            const products=await this.readProducts();
            const productIndex=products.findIndex(product=>product.id===id);
            
            if(productIndex===-1){
                return "producto no encontrado";
            }
            else{
                products[productIndex].title="producto actualizado";
                products[productIndex].description="descripcion actualizada";
                products[productIndex].precio="precio actualizado";
                products[productIndex].thumbnail="imagen actualizada";
                products[productIndex].code="codigo actualizado";
                products[productIndex].stock="stock actualizado";

                await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
                return products[productIndex];
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    getproduct=async(id)=>{
        try{
            const products=await this.readProducts();
            const product=products.find(product=>product.id===id);
            return product;
        }
        catch(error){
            console.log(error);
        }
    }

    deleteProduct=async(id)=>{
        try{
            const products=await this.readProducts();
            const productIndex=products.findIndex(product=>product.id===id);
            if(productIndex===-1){
                return "producto no encontrado";
            }
            else{
                const product=products.splice(productIndex,1);
                await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
                return product;
            }
        }
        catch(error){
            console.log(error);
        }
    }
}

export default productManager












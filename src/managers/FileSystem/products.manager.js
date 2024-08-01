
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
    

    createProducts=async newProduct()=>{
        try{
            
            const products = await this.readProducts();
            const product = {
                title,
                description,
                precio,
                thumbnail,
                code,
                stock}
                
            if (products.length===0){
                newProduct.id=1;
            }
            else{
                newProduct.id=products[products.length-1].id+1;
            }
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
            return newProduct;
        }
        catch(error){
            console.log(error)
        }
    }
}

//updateProducts=async()=>{}

//deleteProducts=async()=>{}




/*
    addProducts(title, description, precio, thumbnail,code,stock){
        
        this.products.length;
        let repeatCode=this.products.some(product => product.code === code);
        

        let product = {
            title,
            description,
            precio,
            thumbnail,
            code,
            stock,
            id: this.products.length-1
        }

        if (repeatCode){
            return"el codigo ya existe"
        }
        else{ 
            this.products.push(product);
        }
        return this.products;
    }


    getproductsById(id){
        let product = this.products.find(product => product.id === id);
        if(product){
            return product;
        }else{
            return "producto no encontrado";
        }
    }

}

const producto1 = new productManager();
producto1.getproducts();
producto1.addProducts("producto prueba", "este es un producto prueba", "200", "sin image", "abc123", "25");
producto1.addProducts("producto prueba", "este es un producto prueba", "200", "sin image", "abc123", "25");

producto1.addProducts("producto prueba", "este es un producto prueba", "200", "sin image", "abc124", "25");
console.log(producto1.getproducts());
console.log(producto1.getproductsById(1));
console.log(producto1.getproductsById(2));
console.log(producto1.getproductsById(3));*/









export default productManager
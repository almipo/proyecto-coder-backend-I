import {Router} from 'express'
import productManager from '../managers/FileSystem/products.manager.js'



const router = Router()
const {getProducts, createProducts, updateProducts, getProduct, deleteProduct } = new productManager();


router.get('/', async(req, res)=>{
    try{
        const{body}=req;
        const productsDb = await getProducts(body);
        res.send({ status: 'success', data: productsDb });
    }
    catch(error){
        console.log(error)
    }
})


router.post('/', async (req, res) => {
    try {
        const { title, description, precio, thumbnail, code, stock } = req.body;
        
       
        if (!title || !description || !precio || !thumbnail || !code || !stock) {
            return res.status(400).send({ status: 'error', message: 'Todos los campos son obligatorios' });
        }

        const newProduct = await createProducts(title, description, precio, thumbnail, code, stock);
        
        res.send({ status: 'success', data: newProduct });
    } catch (error) {
        console.log(error);
    }
});


router.delete('/:pid', async(req,res)=>{
    try{
        const id=req.params.pid;
        const {body} = req;
        const products = await deleteProduct(id)
        res.send({status:'success', data: products});
    }
    catch(error){
        console.log(error);
    }
})

router.put('/:pid', async(req, res)=>{
    try{
        const id = req.params.pid;
        const { title, description, precio, thumbnail, code, stock } = req.body;
        const products = await updateProducts(id, title, description, precio, thumbnail, code, stock)
        res.send({status:'success', data: products});
    }
    catch(error){
        console.log(error);
    }
})

router.get('/:pid', async(req, res)=>{
    try{
        const id=req.params.pid;
        
        const Product = await getProduct(id);
        res.send({status:'success', data: Product});
    }
    catch(error){
        console.log(error);
    }
})


export default router
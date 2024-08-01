import {Router} from 'express'
import productManager from '../managers/FileSystem/products.manager.js'


const router = Router()
const {getproducts, createProducts, updateProduct, getProduct, deleteProduct}=new productManager()

router.get('/', async(req, res)=>{
    try{
    const productsDb =await getproducts()
    res.send({status:'success', data: productsDb})
    }
    catch(error){
        console.log(error)
    }
})


router.post('/', async(req, res)=>{
    try{
        const {body} = req;

        const newProduct = await createProducts(body)
        res.send({status:'success', data: newProduct});
    }
    catch(error){
        console.log(error);
    }
})


router.delete('/:pid', async(req,res)=>{
    try{
        const {body} = req;
        const id = req.params.pid;
        const deleteProduct = await deleteProduct(pid)
        res.send({status:'success', data: deleteProduct});
    }
    catch(error){
        console.log(error);
    }
})

router.put('/:pid', async(req, res)=>{
    try{
        const {body} = req;
        const id = req.params.pid;
        const product = await findById(pid)
        if(!product){
            res.send({status:'error', message: 'product not found'});
        }
        const updateProduct = await getproducts().update(id, body);     
        res.send({status:'success', data: updateProduct});
    }
    catch(error){
        console.log(error);
    }
})

router.get('/:pid', async(req, res)=>{
    try{
        const {body} = req;
        const getProduct = await getProduct(pid);
        res.send({status:'success', data: getProduct});
    }
    catch(error){
        console.log(error);
    }
})


export default router
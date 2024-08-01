import {Router} from 'express'
import productManager from '../managers/FileSystem/products.manager.js'


const router = Router()
const {getproducts}=new productManager()

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
        const newProduct = await createProducts(product);
        res.send({status:'success', data: newProduct});
    }
    catch(error){
        console.log(error);
    }
})

export default router
import { Router } from "express";
import cartManager from '../managers/FileSystem/cart.manager.js'

const router = Router()
const {createCart,getCartById, createProductToCart  } = new cartManager();

router.get('/:cid',async (req, res)=>{
    try{
        const id = req.params.cid;
        const cart = await getCartById(id);
        
        res.send({status:'success', data: cart});   
    }
    catch (error){
        console.log(error)
        }
    } )

router.post('/', async (req, res)=>{
    try{
        const cart = await createCart();
        res.send({status:'success', data: cart});
    }
    catch(error){
        console.log(error)

    }

})

router.post('/:cid/products/:pid', async(req, res)=>{
    try{
        const idC = req.params.cid;
        const idP = req.params.pid;
        const cart = await createProductToCart(idC, idP);
        res.send({status:'success', data: cart});
    }
    catch(error){
        console.log(error)
    }
})
export default router;

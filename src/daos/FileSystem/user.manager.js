import {Router} from'express'




const router= Router();

function auth(req, res, next){
    req.user={
        name:'alan',
        role:'admin'
    }
    if(req.user.role !== 'admin'){
        return res.send ("no puede ingresar");
    }
    next();
}


const users = [];

router. get('/',auth, (req, res)=>{

    res.send({data: users});
})


router. post('/', (req, res)=>{
    const {body}=req
    if(!body.email || !body.password){
        return res.status(400).send({message: 'Falta email o contraseña'})}

    users.push({id:users.lenght+1, ...body});
     res.status(200).send({data:users})
})


router. put('/', (req, res)=>{
    res.send('hola mundo');
})


router. delete('/:uid', (req, res)=>{
    const {uid}=req.params
    const newlist=users.filter(user=>user.id !== number(uid) )
    res.send(newlist);
})





export default router
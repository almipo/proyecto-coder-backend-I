import multer  from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, path.resolve("src/public/img"))
    },
    filename:(req, file, callback)=>{
        callback(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage
})


export default upload;
import multer from "multer";
import {dirname} from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirname(__dirname)}/public/uploads`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    });
    const upload = multer({ storage: storage });
    module.exports = upload;
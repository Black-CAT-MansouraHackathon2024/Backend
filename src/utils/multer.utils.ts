import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import multer, { diskStorage } from 'multer';
import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
dotenv.config();


const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

export default upload;
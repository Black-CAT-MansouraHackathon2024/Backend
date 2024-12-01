import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import multer, { diskStorage } from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary ;

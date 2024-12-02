import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config(); 

console.log('Cloudinary URL:', process.env.CLOUDINARY_URL);

cloudinary.config({
    url: process.env.CLOUDINARY_URL! 
});

export default cloudinary;

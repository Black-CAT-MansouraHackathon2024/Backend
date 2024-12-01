import multer from 'multer';
import path from 'path';

const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile-pics/');
    },
    filename: (req, file, cb) => {
        const filename = `profile-pic-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const profilePicUpload = multer({
    storage: profilePicStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase();
        const mimeType = allowedTypes.test(file.mimetype);

        if (mimeType && allowedTypes.test(ext)) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed.'));
    },
    limits: { fileSize: 1024 * 1024 * 5 } 
});

export { profilePicUpload };

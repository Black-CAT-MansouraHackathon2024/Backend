import { Router } from 'express';
import { 
    createUserController, 
    confirmEmail, 
    loginController, 
    getUserController, 
    updateUserController, 
    getUserProfileController, 
    updateUserProfileController, 
    logoutController, 
    refreshTokenController, 
    uploadProfilePic, 
    forgotPasswordController, 
    addRole, 
    addSkills 
} from '../controllers/user.controller';
import {profilePicUpload} from '../utils/multer.utils';
import { authMiddleware } from '../middlewares/auth.middleware';

const  router = Router();

router.post('/register', createUserController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh_token', refreshTokenController);
router.post('/forgot_password', forgotPasswordController);
router.get('/confirm_email/:token', confirmEmail);

router.get('/profile', getUserProfileController);
router.put('/profile', updateUserProfileController);
router.post('/profile/upload',profilePicUpload.single('file'),uploadProfilePic);

router.get('/add_role', addRole);
router.get('/add_skills', addSkills);

router.get('/', getUserController);
router.put('/', updateUserController);

export default router;

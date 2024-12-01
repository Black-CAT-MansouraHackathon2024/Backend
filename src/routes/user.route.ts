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
import { authMiddleware } from '../middlewares/auth.middleware';

const  router = Router();

router.post('/register', createUserController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh_token', refreshTokenController);
router.post('/forgot_password', forgotPasswordController);
router.get('/confirm_email/:token', confirmEmail);

router.get('/profile', authMiddleware, getUserProfileController);
router.put('/profile', authMiddleware, updateUserProfileController);
router.put('/profile/upload', authMiddleware, uploadProfilePic);

router.get('/:id', authMiddleware, getUserController);
router.put('/:id', authMiddleware, updateUserController);

router.post('/role', authMiddleware, addRole);
router.post('/skills', authMiddleware, addSkills);

export default router;

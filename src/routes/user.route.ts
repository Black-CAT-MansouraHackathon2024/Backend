import express from 'express';
import { 
    createUserController, 
    confirmEmail, 
    loginController, 
    getUserController, 
    updateUserController,
    getUserProfileController,
    updateUserProfileController,
    uploadProfilePicController,
    logoutController,
    refreshTokenController
} from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', createUserController); 
router.post('/login', loginController);
router.get('/confirm-email', confirmEmail); 
router.get('/profile/:userId', getUserProfileController); 
router.put('/profile/:userId', updateUserProfileController); 
router.put('/upload-profile-pic', uploadProfilePicController); 
router.post('/logout', logoutController); 
router.post('/refresh-token', refreshTokenController); 
router.put('/user/:userId', updateUserController);
router.get('/user/:userId', getUserController); 

export default router;

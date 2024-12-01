import {Router} from 'express';
import * as ideaController from '../controllers/idea.controller';
import {authMiddleware} from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authMiddleware,ideaController.createIdea);
router.get('/get',authMiddleware, ideaController.getIdeas);
router.get('/get/:id',authMiddleware, ideaController.getIdea);
router.put('/update/:id',authMiddleware, ideaController.updateIdea);
router.delete('/delete/:id',authMiddleware, ideaController.deleteIdea);

export default router;


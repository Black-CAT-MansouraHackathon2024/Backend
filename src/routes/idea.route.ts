import {Router} from 'express';
import * as ideaController from '../controllers/idea.controller';

const router = Router();

router.post('/create', ideaController.createIdea);
router.get('/get', ideaController.getIdeas);
router.get('/get/:id', ideaController.getIdea);
router.put('/update/:id', ideaController.updateIdea);
router.delete('/delete/:id', ideaController.deleteIdea);

export default router;

